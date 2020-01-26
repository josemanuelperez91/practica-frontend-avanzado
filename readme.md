# BeerFlix

## Install

1. Download the repository, from .zip or with

`git clone https://github.com/josemanuelperez91/practica-frontend-avanzado`

2. In the package.json folder, execute 

`npm install`

to download all the required dependencies, including Express.

## Run

1. Execute in your server the server.js file to make express framework build the app server side.

## Using the App

* This App requires a registered user in order to access API's content. If no user is signed in, a dialog will appear to require one.

### Navbar

* Click or tap on the BeerFlix logo to load the Home page.
* Click or tap on the filters icons to change between input filters.
* Use the input filters to search by word content or to filter beers by date (Beers with brewing date previous to the filter date will be hidden). Searching applies a brief moment after you stop typing and the month filter applies when a month in the calendar pop-up is selected.
* Click or tap on the Sign In button and insert a registered user to access to APIs content. If a user is already signed in, a "Sign out" button will replace it in order to let the current user sign out from the app.

### Home Page

*  Click or tap on a beer to check its details.

### Detail / Beer Page

* Click or tap on the empty heart to give a "like" to the beer you are looking at. A full heart will appear to inform 
 the user that a "like" has already been given to the current beer.
* Write an opinion of said beer and click or tap on the "Send" button to post it.



