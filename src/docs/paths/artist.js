import artistResponse from '../responses/artist.js'
export default {
    "/artist/{id}": {
        summary : "Get exzample artists",
        description : "Get exzample  artists in the datbase",
        get: {
            tags:["artists"],
            param: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema :{
                        type: "integer",
                        minimum: 1
                    },
                    description: "The artist Id"
                }
            ],
            responses: artistResponse
        }
    },
    "/artists/{id}": {
        summary : "Delete exzample artists",
        description : "Delete exzample  artists in the datbase",
        delete: {
            tags:["artists"],
            param: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema :{
                        type: "integer",
                        minimum: 1
                    },
                    description: "The artist Id"
                }
            ],
            responses: artistResponse
        }
    },
    
    "/artiste" :{
        summary : "Create artists",
        description : "Create new  artists in the datbase",
        put: {
            tags: ["artists"],
            requestBody: {
                required: true,
                content: {
                    "application/json" : {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/artistInput"
                            }
                        }
                    }
                }
            },
            responses: artistResponse
        }
    },
    "/artist" :{
        summary : "Create artists",
        description : "Create new  artists in the datbase",
        post: {
            tags: ["artists"],
            requestBody: {
                required: true,
                content: {
                    "application/json" : {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/artistInput"
                            }
                        }
                    }
                }
            },
            responses: artistResponse
        }
    },
    "/artist" :{
        summary : "Get artists",
        description : "Get all artists in the datbase",
        get: {
            tags: ["artists"],
            responses: artistResponse
        }
    }
}