


from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sql_generator import generate_sql
import shutil
import os
import json
from datetime import datetime

from parser import parse_resume
from database import init_db, get_connection

app = FastAPI()

init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Resume Parser API is Running"
    }


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = parse_resume(file_path)

    # -----------------------------
    # Personal Information
    # -----------------------------
    personal = result.get("personal_information", {})

    name = personal.get("full_name", "")
    email = personal.get("email", "")
    phone = personal.get("phone", "")

    # -----------------------------
    # Skills
    # -----------------------------
    technical_skills = result.get("technical_skills", {})

    skills = []

    for category in technical_skills.values():
        if isinstance(category, list):
            skills.extend(category)

    skills = ", ".join(skills)

    # -----------------------------
    # Experience
    # -----------------------------
    experience_list = result.get("professional_experience", [])

    experience = len(experience_list)

    designation = ""
    company = ""

    if experience_list:
        designation = experience_list[0].get("designation", "")
        company = experience_list[0].get("company", "")

    # -----------------------------
    # Education
    # -----------------------------
    education_list = result.get("education", [])

    education = ""
    specialization = ""
    university = ""

    if education_list:
        education = education_list[0].get("degree", "")
        specialization = education_list[0].get("specialization", "")
        university = education_list[0].get("institution", "")

    # -----------------------------
    # Projects
    # -----------------------------
    projects = []

    for p in result.get("projects", []):
        if p.get("project_name"):
            projects.append(p["project_name"])

    projects = ", ".join(projects)

    # -----------------------------
    # Certifications
    # -----------------------------
    certifications = ", ".join(result.get("certifications", []))

    # -----------------------------
    # Languages
    # -----------------------------
    languages = ", ".join(result.get("languages_known", []))

    # -----------------------------
    # Save into SQLite
    # -----------------------------
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO ResumeUploaded
        (
            name,
            email,
            phone,
            skills,
            experience,
            designation,
            company,
            education,
            specialization,
            university,
            projects,
            certifications,
            languages,
            uploaded_at,
            resume_json
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            name,
            email,
            phone,
            skills,
            experience,
            designation,
            company,
            education,
            specialization,
            university,
            projects,
            certifications,
            languages,
            datetime.now().strftime("%d-%m-%Y"),
            json.dumps(result),
        ),
    )

    conn.commit()
    conn.close()

    return result


@app.get("/resumes")
def get_resumes():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            email,
            phone,
            uploaded_at
        FROM ResumeUploaded
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]


@app.get("/resume/{resume_id}")
def get_resume(resume_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT resume_json
        FROM ResumeUploaded
        WHERE id = ?
        """,
        (resume_id,),
    )

    row = cursor.fetchone()

    conn.close()

    if row is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return json.loads(row["resume_json"])
@app.post("/search")
async def search_candidates(data: dict):

    query = data.get("query", "")

    sql = generate_sql(query)

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(sql)

    rows = cursor.fetchall()

    conn.close()

    return {
        "generated_sql": sql,
        "results": [dict(row) for row in rows]
    }