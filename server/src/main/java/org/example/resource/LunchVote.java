package org.example.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/createLunchVote")
public class LunchVote {

    /*
{
  "voteTime": "string",
  "voteName": "string"
}
     */

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.WILDCARD)
    public Response createLunchVote() {

        String exampleString = "ok";
        return Response.status(200).entity(exampleString).build();
    }
}
