package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.CreateLunchVoteApiService;
import io.swagger.api.factories.CreateLunchVoteApiServiceFactory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import io.swagger.model.VoteCreationRequestObject;

import java.util.Map;
import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.servlet.ServletConfig;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.*;
import javax.validation.constraints.*;


@Path("/createLunchVote")


@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaJerseyServerCodegen", date = "2019-11-30T17:46:47.852Z[GMT]")public class CreateLunchVoteApi  {
   private final CreateLunchVoteApiService delegate;

   public CreateLunchVoteApi(@Context ServletConfig servletContext) {
      CreateLunchVoteApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("CreateLunchVoteApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (CreateLunchVoteApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = CreateLunchVoteApiServiceFactory.getCreateLunchVoteApi();
      }

      this.delegate = delegate;
   }

    @POST
    
    @Consumes({ "application/json" })
    
    @Operation(summary = "Creates a new lunch vote", description = "Creates a new lunch vote, returns the GUID for that lunch vote.", tags={  })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "201", description = "Created"),
        
        @ApiResponse(responseCode = "400", description = "Bad Request") })
    public Response createLunchVote(@Parameter(description = "Create a new vote with a particular name at a particular time." ,required=true) VoteCreationRequestObject body

,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.createLunchVote(body,securityContext);
    }
}
