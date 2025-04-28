# Fish and Fitness

## About

Fish and Fitness is a fitness motivation app built using [React](https://react.dev/) and [Django](https://www.djangoproject.com/) designed to create an engaging experience for users through a wide variety of 'fish-themed' features.

Some of these features include...

-   A dynamic goal system with rewards for completion
-   Integration with the [Strava API](https://developers.strava.com/docs/reference/) to retrieve accurate workout and route data
-   A wide variety of collectable fish to entice further physical activites!

## How to use this project

### Strava API Setup

> [!IMPORTANT]
> Make sure to get the correct API keys for your Strava account.
> [Here is a good, more in-depth tutorial to get your correct keys.](https://towardsdatascience.com/using-the-strava-api-and-pandas-to-explore-your-activity-data-d94901d9bfde/)

1. Create or log in to your [Strava](https://strava.com/register) account.
2. After logging in, navigate to the [Strava API settings](https://www.strava.com/settings/api).
3. Create an API Application with the 'Social Motivation' category, as well as `localhost` for the 'Website' and 'Authorization Callback Domain' categories.
4. Follow the steps found [here](https://towardsdatascience.com/using-the-strava-api-and-pandas-to-explore-your-activity-data-d94901d9bfde/) to get the correct Client ID, Client Secret, and Refresh Token.
    > [!IMPORTANT]
    > the Refresh Token on your API Application page does not have the correct permissions, so you must go through the steps linked above to get a new Refresh Token
5. Once you have your Client ID, Client Secret, and Refresh Token, navigate to the `/backend/fishing_backend/fishing_backend/.env.example` file in your local repository.
6. Update `.env.example` with your keys, then rename the file to `.env`.

### Frontend Setup

1. Open a new terminal instance
2. From the root directory of your local repository, run `cd frontend` in the terminal to navigate to the frontend directly.
3. Run `npm i` in the terminal to install all required dependencies.
4. Run `npm run dev` in the terminal to run the app in development mode.
5. Navigate to [localhost:5173](http://localhost:5173) to access the page!

### Backend Setup

1. Open a new terminal instance
2. Activate the Python virtual environment by running the following command in the terminal
    - Windows: `venv\Scripts\activate.bat`
    - Unix/Mac: `source venv/bin/activate`
3. Run `cd fishing_backend` to navigate to the Django project folder
4. Install all dependencies by running `pip install -r requirements.txt`
5. Start the server
    - Windows: `py manage.py runserver`
    - Unix/Mac: `python manage.py runserver`
6. Open the server at [127.0.0.1:8000](http://127.0.0.1:8000) to view available endpoints.

### Using the application

1. Create an account with your username and password, then log in with your newly created credentials.
2. Open the 'Goals' tab and accept a quest! You are able to reroll as many times as you'd like until you find one you would like to complete.
3. Once you have chosen a quest, open the Strava app on your phone and record a route where you complete the requirements stated for your quest.
4. After finishing your Strava trip, click the 'Update progress' button to fetch the new data from the Strava API.
5. Claim your reward and open the fish crate(s) you obtained through the 'Backpack' menu.
6. View your fish collection in the 'Fishapedia' menu.
7. Repeat!

## Demo<!-- Required -->

<!--
* You can add a demo here GH supports images/ GIFs/videos
*
* It's recommended to use GIFs as they are more dynamic
-->

## Table of Contents<!-- Optional -->

<!--
* This section is optional, yet having a contents table
* helps keeping your README readable and more professional.
*
* If you are not familiar with HTML, no worries we all been there :D
* Review learning resources to create anchor links.
-->

<dev align="center">
    <table align="center">
        <tr>
            <td><a href="#about">About</a></td>
            <td><a href="#how-to-use-this-project">Getting started</td>
            <td><a href="#demo">Demo</a></td>
            <td><a href="#project-roadmap--">Project Roadmap</a></td>
            <td><a href="#documentation">Documentation</a></td>
        </tr>
        <tr>
            <td><a href="#contributors">Contributors</a></td>
            <td><a href="#acknowledgments">Acknowledgments</a></td>
            <td><a href="#feedback">Feedback</a></td>
            <td><a href="#contact">Contact</a></td>
            <td><a href="#license">License</a></td>
        </tr>
    </table>
</dev>

<!-- - Use this html element to create a back to top button. -->
<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>

## Project Roadmap <!-- Optional --> <!-- add learning_Rs-->

<!--
* Add this section in case the project has different phases
*
* Under production or will be updated.
-->

<!-- - Use this html element to create a back to top button. -->
<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>

## Documentation<!-- Optional -->

<!--
* You may add any documentation or Wikis here
*
*
-->

## Contributors<!-- Required -->

<!--
* Without contribution we wouldn't have open source.
*
* Generate github contributors Image here https://contrib.rocks/preview?repo=angular%2Fangular-ja
-->

## Acknowledgments<!-- Optional -->

<!--
* Credit where it's do
*
* Feel free to share your inspiration sources, Stackoverflow questions, github repos, tools etc.
-->

<!-- - Use this html element to create a back to top button. -->
<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>

## Feedback<!-- Required -->

<!--
* You can add contacts information like your email and social media account
*
* Also it's common to add some PR guidance.
-->

## Contact<!-- Required -->

<!--
* add your email and contact info here
*
*
-->

## License<!-- Optional -->

<!--
* Here you can add project license for copyrights and distribution
*
* check this website for an easy reference https://choosealicense.com/)
-->

<!-- - Use this html element to create a back to top button. -->
<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>
