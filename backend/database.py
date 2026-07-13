import sqlite3

DATABASE = "resumes.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ResumeUploaded(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT,

        email TEXT,

        phone TEXT,

        skills TEXT,

        experience INTEGER,

        designation TEXT,

        company TEXT,

        education TEXT,

        specialization TEXT,

        university TEXT,

        projects TEXT,

        certifications TEXT,

        languages TEXT,

        uploaded_at TEXT,

        resume_json TEXT

    )
    """)

    conn.commit()
    conn.close()