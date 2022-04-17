/**
 * apischemas
 */

export default {
    "User": {
        properties : {
                id : {type: "number"},
                email: { type: "string" },
                nickname: { type: "string" },
                password: { type: "string" },
            user_meta: {
                $ref: "#/components/schemas/UserMeta"
            },
            role: {
                $ref: "#/components/schemas/Role"
            }
        }
    },
    "UserInput": {
        properties : {
                firstname: { type: "string" },
                lasttname: { type: "string" },
            user_meta: {
                $ref: "#/components/schemas/UserMeta"
            },
            role: {
                $ref: "#/components/schemas/Role"
            }
        },
        example: {
            firstname: "Kuki",
            lasttname: "Goede",
            email: "test@gmail.com",
            nickname: "googen",
            password: "test",
            user_meta: {
                firstname: "Godstraa",
                lasttname: "kuki",
                avatar: "Gode.png"
            }, role: {
            name: "admin"
            }
        }  
    },
    "UserMeta": {
        properties : {
            id : {type: "number"},
            firstname: { type: "string" },
            lasttname: { type: "string" },
            avatar: {type : "string"}
        }
    },
    // rolen
    //intrest
    "RoleInput":{
        properties: {
            name: {type: "string"}  
        }
    },
    "Role" :{
        properties: {
            id: {type:"number"},
            name: {type: "string"}  
        }
    },
    "NavigationItem" :{
        properties: {
            id: {type:"number"},
            url: {type: "string"},
            text: {type: "string"}
        }
    },
    "ArtistItem": {
        properties : {
            id : {type: "number"},
            name: { type: "varchar" },
            album_item: {
                $ref: "#/components/schemas/AlbumItem"
            },
        
        }
    },
    "ArtistInput": {
        properties : {
                name: { type: "string" },
            album_item: {
                $ref: "#/components/schemas/AlbumItem"
            },
            
        },
        example: {
            name: "Kuki",

            album_item: {
                name: "Godstraa",
            },
    },
    "AlbumItem": {
        properties : {
            id : {type: "number"},
            name: { type: "varchar" },
            artist_item: {
                $ref: "#/components/schemas/ArtistItem"
            },
        
        }
    },
    "Song" :{
        properties : {
            id : {type: "number"},
            name: { type: "varchar" },
            album_item: {
                $ref: "#/components/schemas/AlbumItem"
            },
            artist_item: {
                $ref: "#/components/schemas/ArtistItem"
            },
        }
    }
}}