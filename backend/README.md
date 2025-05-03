### Instructions for running backend locally

1. Activate the Python virtual environment by running the following command in the terminal
    - Windows: `venv\Scripts\activate.bat`
    - Unix/Mac: `source venv/bin/activate`
2. Run `cd fishing_backend` to navigate to the Django project folder
3. Install all dependencies by running `pip install -r requirements.txt`
4. Set up Strava API with your own personal Client ID, Client Secret, and Refresh Token
    - Replace the contents of `.env.example` with your values, then rename the file to `.env`
5. Start the server
    - Windows: `py manage.py runserver`
    - Unix/Mac: `python manage.py runserver`
6. Open the server at [127.0.0.1:8000](http://127.0.0.1:8000)
