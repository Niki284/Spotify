
import schemas from "./schemas.js"
import paths from "./paths/index.js"
export default {
    openapi: "3.0.0",
        info: {
            version:"1.0.0",
            title: "All open api",
            description: "Controle data api",
            license: {
                name : "Spotify",
                url : "https://developer.spotify.com/",
            }
        },
        servers : [
            {
                url: "http://localhost:4230/api",
                description: "Development server",
            }
        ],
        tags: [
            {
                name:"Users",
                description: "All create rite, update delete : users"
            }
        ],
        paths,
        components: {
            schemas
        }
}