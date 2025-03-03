guide to perform the chatbot for whatsapp

install the dependencies with [ pip install -r requirements.txt ]

cd backend


1 : if you are using ubuntu, activate the venv environment by (source venv/bin/activate)
    if using windows, create a venv (python -m venv myenv) and activate (myenv/Scripts/activate)

you are in backend dir, open gemini.py and run the scripts (to check the available gemini models (OPTIONAL, IF YOUR PRESENT API IS NOT WORKING OR EXPIRES))
if the current gemini model expires, change the main.py/model = genai.GenerativeModel("gemini-1.5-flash") model name to other model name seen in the gemini.py 

2 : open second terminal 
    open whatsapp-bot directory

3 : open the first terminal, run (uvicorn main:app --reload) [(venv) wac@PY07:~/Downloads/fastapi_learn/botter$ uvicorn main:app --reload]

4 : in the second terminal, run the script (node bot.js) [wac@PY07:~/Downloads/fastapi_learn/botter/whatsapp-bot$ node bot.js]
    it will display qr code, immediately scan with whatsapp linked devices

    NOTE : delete auth dir in whatsapp-bot/auth/ as this might save previous owners data, and run again
    NOTE : to de-link the whatsapp bot - stop the terminal, delete the auth dir, then remove linked devices in phone 