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

    > NOTE: The Refresh Token on your API Application page does not have the correct permissions, so you must go through the steps linked above to get a new Refresh Token

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

## Table of Contents

<dev align="center">
    <table align="center">
        <tr>
            <td><a href="#about">About</a></td>
            <td><a href="#how-to-use-this-project">Getting started</td>
            <td><a href="#demo">Demo</a></td>
            <td><a href="#project-roadmap--">Project Roadmap</a></td>
        </tr>
        <tr>
            <td><a href="#documentation">Documentation</a></td>
            <td><a href="#contributors">Contributors</a></td>
            <td><a href="#feedback">Feedback</a></td>
            <td><a href="#contact">Contact</a></td>
        </tr>
    </table>
</dev>

<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>

## Project Roadmap

-   Implement more quests
-   Add a page to view statistics and previous activity details
    -   Most common activities
    -   Total distance walked
    -   Quantity of quests completed
-   Refactoring!
-   Deployment!

<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>

## Documentation

-   [Strava API](https://developers.strava.com/)

## Contributors<!-- Required -->

<!--
* Without contribution we wouldn't have open source.
*
* Generate github contributors Image here https://contrib.rocks/preview?repo=angular%2Fangular-ja
-->

<a href="https://github.com/University-of-Illinois-Chicago/fgp-al-khwarizmi/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=University-of-Illinois-Chicago/fgp-al-khwarizmi" />
</a>

#### Logan Lucas

-   Designed and developed React frontend
-   Constructed HTTP requests between React and Django
-   Implemented quest system
-   Made this README you're reading right now!

#### Jonathan Kang

-   Set up authentication for the Strava API
-   Planned and constructed SQLite database for the entire application
-   Developed backend operations for opening crates and distributing rewards
-   Implemented Cuckoo filter in user database for increased efficiency

#### Ron Pham

-   Laid groundwork for fishing system
-   Gathered data for rewards
-   Tested application

## Feedback

> [!NOTE]
> If you have any questions or concerns, feel free to reach out to any of the contributors through our contact information found <a href="#contact">here</a>.

To contribute, create a PR with your changes and add a detailed description of what changes/improvements you made (and reasoning if applicable).

## Contact

#### Logan Lucas

-   Email: [lluca5@uic.edu](mailto:lluca5@uic.edu)

#### Jonathan Kang

-   Email: [jkang87@uic.edu](mailto:jkang87@uic.edu)

#### Ron Pham

-   Email: [tpham67@uic.edu](mailto:tpham67@uic.edu)

<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>
