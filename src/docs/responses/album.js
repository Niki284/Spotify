/**
 * The artist responses
 */
 export default {
    "200": {
        content: {
            "application/json" : {
                schema: {
                    $ref: "#/components/schemas/AlbumItem"   
                }
            }
        }
    }
}