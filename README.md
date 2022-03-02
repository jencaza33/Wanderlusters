# Wanderlusters
## LightHouseLabs Final Project
Wanderlusters is a travel companion website built by Jen, Zakiya and Khadeeja for the Lighthouse Labs final project.
We were given one week to create this website and fulfill all the MVPs that we had set for ourselves. We used a PERN stack using Create React App.
In this project, we created an app that users are able to search for restaurants, hotels and attractions in a given area. The user is brought automatically to their location using geolocation but they can also search for a specific location that they desire to travel to. The user will see information cards on the map to see where the locations are situated.

*Map*
!["Map"](https://github.com/jencaza33/Wanderlusters/blob/main/client/src/docs/Map.png?raw=true)
*Info card with drop down filter*
The info cards display ratings, rankings, awards, type of food/attraction, contact information, address and gives 2 links to travel advisor and the locations website.The user is able to filter information cards about the locations by type and rating. 
!["Info Card"](https://github.com/jencaza33/Wanderlusters/blob/main/client/src/docs/DropDownFilter.png?raw=true)
*Search for locations*
!["Search Bar"](https://github.com/jencaza33/Wanderlusters/blob/main/client/src/docs/SearchBar.png?raw=true)
*Itinerary Page*
!["Itinerary"](https://github.com/jencaza33/Wanderlusters/blob/main/client/src/docs/Itinerary.png?raw=true)

## Getting Started
1. Visit https://rapidapi.com/hub and make Open Weather Map and Travel Advisor keys
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
3. Update the .env file with your correct local information 
  - REACT_APP_WEATHER=(OWM key)
  - REACT_APP_TRAVEL=(Travel Advisor Key)
  
4. Install dependencies for both client and server: `npm i`
5. Reset database in server: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm start`
  - Note: nodemon is used, so you should not have to restart your server
8. Run the client: `npm start` and you will be directed to the page
9. Enjoy!
## Warnings & Tips
- The rapid api keys need to be subscribed to test and only allow for 500 requests a month.


