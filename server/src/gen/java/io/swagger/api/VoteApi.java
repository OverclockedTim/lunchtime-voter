package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.VoteApiService;
import io.swagger.api.factories.VoteApiServiceFactory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import io.swagger.model.VoteObject;

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


@Path("/vote")


@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaJerseyServerCodegen", date = "2019-11-30T17:46:47.852Z[GMT]")public class VoteApi  {
   private final VoteApiService delegate;

   public VoteApi(@Context ServletConfig servletContext) {
      VoteApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("VoteApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (VoteApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = VoteApiServiceFactory.getVoteApi();
      }

      this.delegate = delegate;
   }

    @POST
    
    @Consumes({ "application/json" })
    
    @Operation(summary = "Vote for all of the lunch spots that sound good to you.", description = "", tags={  })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Ack."),
        
        @ApiResponse(responseCode = "400", description = "bad input parameter") })
    public Response votePost(@Parameter(description = "" ,required=true) List<VoteObject> body

,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.votePost(body,securityContext);
    }
}
