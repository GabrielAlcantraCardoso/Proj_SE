# Instant-Travellers-Diary
SE project semester 5

## How to run the site locally
### Steps 3 and 5 are done **ONLY ONCE**

1. Open powershell and get to the Instant-Travellers-Diary folder
2. Type the command `Set-ExecutionPolicy Unrestricted -Scope Process`
3. Create virtual environment `python -m venv .venv`
4. Enable virtual environment `.\.venv\Scripts\Activate.ps1`
5. Download dependencies `pip install -r requirements.txt`
6. Run the site `flask --app flaskr --debug run`

The site will be on http://127.0.0.1:5000/
