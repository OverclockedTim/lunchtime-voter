package org.example.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/getSuggestions")
public class SuggestionsResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.WILDCARD)
    public Response getSuggestions() {

        String exampleString = "[\n" +
                "  {\n" +
                "    \"lunchId\": \"d290f1ee-6c54-4b01-90e6-d701748f0851\",\n" +
                "    \"suggestionTitle\": \"McDonalds\",\n" +
                "    \"suggestionDescription\": \"A place to eat fries\"\n" +
                "  }\n" +
                "]";
        return Response.status(200).entity(exampleString).build();
    }
}
