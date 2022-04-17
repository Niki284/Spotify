
import userResponse from '../responses/user.js'
export default {
    "/user/{id}": {
        summary : "Get exzample Users",
        description : "Get exzample  users in the datbase",
        get: {
            tags:["Users"],
            param: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema :{
                        type: "integer",
                        minimum: 1
                    },
                    description: "The user Id"
                }
            ],
            responses: userResponse
        }
    },
    "/users/{id}": {
        summary : "Delete exzample Users",
        description : "Delete exzample  users in the datbase",
        delete: {
            tags:["Users"],
            param: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema :{
                        type: "integer",
                        minimum: 1
                    },
                    description: "The user Id"
                }
            ],
            responses: userResponse
        }
    },
    
    "/usere" :{
        summary : "Create Users",
        description : "Create new  users in the datbase",
        put: {
            tags: ["Users"],
            requestBody: {
                required: true,
                content: {
                    "application/json" : {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/UserInput"
                            }
                        }
                    }
                }
            },
            responses: userResponse
        }
    },
    "/user" :{
        summary : "Create Users",
        description : "Create new  users in the datbase",
        post: {
            tags: ["Users"],
            requestBody: {
                required: true,
                content: {
                    "application/json" : {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/UserInput"
                            }
                        }
                    }
                }
            },
            responses: userResponse
        }
    },
    "/users" :{
        summary : "Get Users",
        description : "Get all users in the datbase",
        get: {
            tags: ["Users"],
            responses: userResponse
        }
    }
}