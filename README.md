DISCLAIMER:
- This application is built as a demonstration only and should not be used in any professional/production environment
- All the data used in this application is taken from https://workoutlabs.com

DATA: 
- All the data used in this application is taken from https://workoutlabs.com. The commands used to collect the data are in data/commands.txt All the collected data is in data/exercise_data.txt, which was used in order to set up the MongoDB database

SERVER:

- Authentication (login, loigout, signup) requests are handled in controllers/authController.js, by sending jwt token inside a cookie
- All of the main application requests are handled by the userRoutes.js in the routes folder

CLIENT:

- All of the vue components are stored inside the src/componenets folder
- Main views (Home and Exercise List) are stored in src/views
- src/modules contains all of the global states and methods used by multiple components

In order to run the app in the developememnt environment:
- change "host" attribute in the src/vars.js
- run "npm run start" in the root folder
- run "npm run serve" in the client folder

DEPLOYED APP: https://workoutvuejustinas.herokuapp.com/
