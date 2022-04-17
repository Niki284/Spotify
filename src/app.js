import express from "express";
import  "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import { home,  } from "./controllers/home.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";
import coockieParser from "cookie-parser";
import { createConnection } from "typeorm";
import entities from './models/index.js'
import { getUsers } from "./controllers/api/user.js";
import { login, logout, postLogin, postRegister, register } from "./controllers/authentication.js";

import validationAuthentication from './middleware/validation/authention.js';
import { jwtAuth } from "./middleware/jwtAuth.js";
import loginAuthention from "./middleware/validation/loginAuthention.js";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDefinition from './docs/swagger.js';
import { deleteArtist, getArtist, postArtist, updateArtist } from "./controllers/api/artist.js";
import { deleteSong, getSong, postSong, updateSong } from "./controllers/api/song.js";
import { deleteAlbum, getAlbum, postAlbum, updateAlbum } from "./controllers/api/album.js";
import { deletePlaylist, getPlaylist, postPlaylist, updatePlaylist } from "./controllers/api/playlist.js";
const app = express();
app.use(express.static( 'public'))

/**
 * Import the body parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Import the cookie  parser
 */
 app.use(coockieParser());
 
 
/**
 * swagger 
 */
app.use('/api-docs', swaggerUiExpress.serve,
swaggerUiExpress.setup(swaggerDefinition))
/**
 * Handlebars Init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"))

/**
 * App Routing
 */

app.get('/', jwtAuth, home);
app.get('/login', login)
app.get('/register', register)

app.post('/register', ...validationAuthentication, postRegister, register);
app.post('/login', ...loginAuthention, postLogin, login);
app.post('/logout', logout);

/**
 * POST	/api/login	Aanmelden van een gebruiker waarna een token terugkomt	X	X	X
POST	/api/register	Registreren van een gebruiker	X	X	X
GET	/api/users	Ophalen van een lijst van gebruikers	X		
GET	/api/user/:id	Ophalen van een gebruiker op basis van het id	X		
DELETE	/api/user/:id	Verwijderen van een gebruiker op basis van het id	X		
POST	/api/artist	Aanmaken van een artiest	X		
PUT	/api/artist	Aanpassen van een artiest	X	X	
DELETE	/api/artist	Verwijderen van een artiest	X		
GET	/api/artists	Ophalen van alle artiesten	X	X	X
POST	/api/song	Aanmaken van een song	X		
PUT	/api/song	Aanpassen van een song	X	X	
DELETE	/api/song	Verwijderen van een song	X		
GET	/api/songs	Ophalen van alle songs	X	X	X
GET	/api/song/:id	Ophalen van een song op basis van het id	X	X	X
POST	/api/album	Aanmaken van een song	X		
PUT	/api/album	Aanpassen van een album	X	X	
DELETE	/api/album	Verwijderen van een album	X		
GET	/api/albums	Ophalen van alle albums	X	X	X
GET	/api/album/:id	Ophalen van een album op basis van het id	X	X	X
POST	/api/playlist	Aanmaken van een playlist	X		
PUT	/api/playlist	Aanpassen van een playlist	X	X	
DELETE	/api/playlist	Verwijderen van een playlist	X		
GET	/api/playlists	Ophalen van alle playlists	X	X	X
GET	/api/playlist/:id	Ophalen van een playlist op basis van het id	X	X	X
GET	/api/playlists/:userId	Ophalen van een playlist op basis van zijn userID	X	X	X
POST	/api/playlists/addSong	Toevoegen van een song aan een bepaalde playlist	X			
 */	
app.get("/api/users")				
app.get("/api/user/:id",)				
app.delete("/api/user/:id",)			
app.post("/api/artist",postArtist )			
app.put("/api/artist",updateArtist)			
app.delete("/api/artist",deleteArtist)			
app.get("/api/artists",getArtist)		
app.post("/api/song",postSong)				
app.put("/api/song",updateSong)			
app.delete("/api/song",deleteSong)	
app.get("/api/songs",getSong)		
app.get("/api/song/:id",getSong)	
app.post("/api/album",postAlbum)			
app.put("/api/album",updateAlbum)			
app.delete("/api/album",deleteAlbum)			
app.get("/api/albums",getAlbum)	
app.get("/api/album/:id",getAlbum)		
app.post("/api/playlist",postPlaylist)				
app.put("/api/playlist",updatePlaylist)			
app.delete("/api/playlist",deletePlaylist)	
app.get("/api/playlists",getPlaylist)		
app.get("/api/playlist/:id",getPlaylist)		
app.get("/api/playlists/:userId",getPlaylist)		
app.post("/api/playlists/addSong",postPlaylist)	

/**
 * API Routing
 */

app.get("/api/user", getUsers);

/**
 * Create datbase connection and start listening
 */

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  // logging: true,
  synchronize: true
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Application is running on http://localhost:${process.env.PORT}/.`);
  });
})

