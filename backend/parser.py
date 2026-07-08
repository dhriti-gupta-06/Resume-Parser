import requests
import json
import re
from pypdf import PdfReader


IAM_API_KEY = "SX36iF12vCAeuug1_u8CXuHXi1GlEb_1vEspPjKC_7OY"

PROJECT_ID = "0d6b7eec-9a0f-45e5-b490-c41af4bf5ea1"

MODEL_ID = "meta-llama/llama-3-3-70b-instruct"

def get_access_token():
    url = "https://iam.cloud.ibm.com/identity/token"

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        "apikey": IAM_API_KEY
    }

    response = requests.post(url, headers=headers, data=data)

    print("Status Code:", response.status_code)
    print("Response:", response.text)

    if response.status_code != 200:
        print("Status:", response.status_code)
        print(response.text)

    response.raise_for_status()

    return response.json()["access_token"]

# def get_access_token():
#     url = "https://iam.cloud.ibm.com/identity/token"

#     headers = {
#         "Content-Type": "application/x-www-form-urlencoded"
#     }

#     data = {
#         "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
#         "apikey": IAM_API_KEY
#     }

#     response = requests.post(url, headers=headers, data=data)
#     response.raise_for_status()

#     return response.json()["access_token"]



def extract_resume_text(pdf_path):
    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text
def extract_email(text):
    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    if match:
        return match.group()

    return ""
def extract_phone(text):

    match = re.search(
        r"(\+?\d[\d\s\-]{8,15}\d)",
        text
    )

    if match:
        return match.group().strip()

    return ""
def parse_resume(pdf_path):
    resume_text = extract_resume_text(pdf_path)
    print("========== EXTRACTED TEXT ==========")
    print(resume_text)
    print("====================================")
    email = extract_email(resume_text)
    phone = extract_phone(resume_text) 
   

    access_token = get_access_token()


    url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-05-29"

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }


    prompt = f"""
    You are an expert resume parsing assistant.

    Analyze the following resume carefully and extract every piece of information.

    Return ONLY valid JSON.

    Rules:

    1. Do not add explanations.
    2. Do not use markdown.
    3. Do not hallucinate.
    4. If a field does not exist return null, "" or [].
    5. Preserve dates exactly.
    6. Extract every skill individually.
    7. Extract project technologies as arrays.
    8. Extract every responsibility as separate array items.

    Return JSON in the following schema:

    {{
      "personal_information": {{
        "full_name": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "github": "",
        "portfolio": "",
        "website": ""
      }},

      "professional_summary": "",

      "technical_skills": {{
        "languages": [],
        "ai_ml": [],
        "web": [],
        "cloud": [],
        "devops": [],
        "databases": [],
        "tools": [],
        "concepts": []
      }},

      "professional_experience": [
        {{
          "company": "",
          "designation": "",
          "employment_type": "",
          "location": "",
          "start_date": "",
          "end_date": "",
          "currently_working": false,
          "responsibilities": []
        }}
      ],

      "projects": [
        {{
          "project_name": "",
          "duration": "",
          "technologies": [],
          "description": [],
          "github_link": "",
          "live_link": ""
        }}
      ],

      "education": [
        {{
          "degree": "",
          "specialization": "",
          "institution": "",
          "location": "",
          "cgpa": "",
          "percentage": "",
          "start_date": "",
          "end_date": ""
        }}
      ],

      "certifications": [],

      "achievements": [],

      "internships": [],

      "leadership": [],

      "volunteer_experience": [],

      "publications": [],

      "patents": [],

      "languages_known": [],

      "interests": [],

      "hobbies": [],

      "additional_information": {{}}
    }}

    Resume:

    {resume_text}
    """


    body = {
        "messages": [
            {
                "role": "system",
                "content": "You are an expert resume parser."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "project_id": PROJECT_ID,
        "model_id": MODEL_ID,
        "temperature": 0,
        "max_tokens": 4000
    }



    response = requests.post(
        url=url,
        headers=headers,
        json=body
    )

    response.raise_for_status()

    result = response.json()


    content = result["choices"][0]["message"]["content"]

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()
    try:
        parsed = json.loads(content)
        parsed["personal_information"]["email"] = email
        parsed["personal_information"]["phone"] = phone

        return parsed
    except json.JSONDecodeError:
        raise Exception("IBM Watsonx returned invalid JSON.")