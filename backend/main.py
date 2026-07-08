
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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
    print(result["personal_information"]["email"])

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO resumes
        (
            name,
            email,
            uploaded_at,
            resume_json
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            result["personal_information"].get("full_name", ""),
            result["personal_information"].get("email", ""),
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
            uploaded_at
        FROM resumes
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
        FROM resumes
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