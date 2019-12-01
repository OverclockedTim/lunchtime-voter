package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.GetVoteStatusApiService;
import io.swagger.api.factories.GetVoteStatusApiServiceFactory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import io.swagger.model.VoteStatusObject;

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


@Path("/getVoteStatus")


@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaJerseyServerCodegen", date = "2019-11-30T17:46:47.852Z[GMT]")public class GetVoteStatusApi  {
   private final GetVoteStatusApiService delegate;

   public GetVoteStatusApi(@Context ServletConfig servletContext) {
      GetVoteStatusApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("GetVoteStatusApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (GetVoteStatusApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = GetVoteStatusApiServiceFactory.getGetVoteStatusApi();
      }

      this.delegate = delegate;
   }

    @GET
    
    
    @Produces({ "application/json" })
    @Operation(summary = "Returns a list of suggestions for the current lunch vote. Note that voteResults are only included if we are past the voteTime", description = "", tags={  })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "search results matching criteria", content = @Content(schema = @Schema(implementation = VoteStatusObject.class))) })
    public Response getVoteStatusGet(@Parameter(description = "GUID of the lunch to get status of",required=true) @PathParam("lunchId") String lunchId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getVoteStatusGet(lunchId,securityContext);
    }
}
