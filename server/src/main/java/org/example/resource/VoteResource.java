package org.example.resource;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/vote")
public class VoteResource {

    /*
    Expected input:
    [
  {
    "lunchId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "acceptableChoices": [
      0
    ]
  }
]

     */
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.WILDCARD)
    public Response vote() {

        String exampleString = "ok";
        return Response.status(200).entity(exampleString).build();
    }

}
