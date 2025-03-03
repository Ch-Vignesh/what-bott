# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from openai import OpenAI

# client = OpenAI(api_key=OPENAI_API_KEY)
# import os
# from dotenv import load_dotenv

# # Load API keys
# load_dotenv()
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# # Initialize OpenAI API

# app = FastAPI()

# class Message(BaseModel):
#     text: str

# @app.post("/reply")
# async def reply_to_message(message: Message):
#     try:
#         # Generate AI response
#         response = client.chat.completions.create(model="gpt-3.5-turbo",
#         messages=[{"role": "system", "content": "You are a helpful assistant."},
#                   {"role": "user", "content": message.text}])
#         ai_response = response.choices[0].message.content
#         return {"reply": ai_response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import os
# from dotenv import load_dotenv
# from openai import OpenAI

# # Load environment variables
# load_dotenv()

# # Get OpenAI API key
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# if not OPENAI_API_KEY:
#     raise ValueError("❌ OPENAI_API_KEY is not set in the .env file!")

# # Initialize OpenAI client
# client = OpenAI(api_key=OPENAI_API_KEY)

# app = FastAPI()

# class Message(BaseModel):
#     text: str

# @app.post("/reply")
# async def reply_to_message(message: Message):
#     try:
#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[{"role": "system", "content": "You are a helpful assistant."},
#                       {"role": "user", "content": message.text}]
#         )
#         ai_response = response.choices[0].message.content
#         return {"reply": ai_response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))






from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API Key
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

class Message(BaseModel):
    text: str

@app.post("/reply")
async def reply_to_message(message: Message):
    try:
        # Generate AI response using Gemini
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(message.text)

        return {"reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

