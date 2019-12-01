package org.example.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/suggest")
public class SuggestResource {

    /*
    Expected input:

    {
  "lunchId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "suggestionTitle": "McDonalds",
  "suggestionDescription": "A place to eat fries"
}

     */
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.WILDCARD)
    public Response suggest() {

        String exampleString = "ok";
        return Response.status(200).entity(exampleString).build();
    }
}
