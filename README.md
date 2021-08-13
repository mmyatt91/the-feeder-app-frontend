# Capstone 2 - The Feeder App (Frontend)

A Recipe Directory Built from the Edaman Recipe Search API 

See App on Heroku: https://feeder-app-frontend.herokuapp.com/

## Overview: 
A web application that allows users to search for recipes based on ingredients, diet types, health restrictions, and more. 

## Tech Stack:
- Frontend: 
React

- Libraries:
Axios,
React-Icons,
JSONWebtoken

- API Used for Data Source: 
https://api.edaman.com

## App Features Include:
### Main Feature
- Searching for recipes using keywords, i.e. vegan, low-calorie, chicken, etc.
### Bonus Features
- Favoriting/Unfavoriting recipes that are saved to the user's favorite page
- Update and make changes to a User's Profile
- Redirects users to the full recipe based on the url source of each recipe rendered.
### User Flow
- Step 1: From the homepage, the user clicks a button to  sign up or log in (if already registered) to their account.
- Step 2: User is then redirected to the app's main page, which features a search form/input, and navigation bar displaying "Favorites" (which redirects the user to a page featuring all of their previously favorited recipes from their last login), "Profile" (which redirects the user to a page, where they can make changes to their account info, i.e. email, first name, etc.), and "Log Out" (which logs out the user and redirects to the app's login page).
- Step 3:  After entering a keyword and submitting the search form/input, individual recipe cards are rendered, displaying the recipe's ingredients, a heart button for favoriting, and a "Full Recipe" button that redirects the user to the recipe's source url.
- Step 4: To search for new recipes, the user simply inputs a new keyword, and recipe cards are rendered.

## The Feeder App

- The Feeder App - Main page:
![Alt text](/src/app_shot1.png?raw=true "App Homepage")


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Start Frontend from Terminal
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


