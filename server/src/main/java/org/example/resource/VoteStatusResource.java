package org.example.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/getVoteStatus")
public class VoteStatusResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.WILDCARD)
    public Response getVoteStatus() {

        String exampleString = "{\n" +
                "  \"voteCountdown\": {\n" +
                "    \"voteTime\": \"Monday, 12:00 PM\",\n" +
                "    \"timeRemaining\": \"4 hours, 13 minutes, 12 seconds\"\n" +
                "  },\n" +
                "  \"voteResults\": {\n" +
                "    \"suggestionTitle\": \"McDonalds\",\n" +
                "    \"suggestionDescription\": \"A place to eat fries\",\n" +
                "    \"voteCount\": 2\n" +
                "  }\n" +
                "}";
        return Response.status(200).entity(exampleString).build();
    }
}
