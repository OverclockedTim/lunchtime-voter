package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.SuggestApiService;
import io.swagger.api.factories.SuggestApiServiceFactory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import io.swagger.model.CreateSuggestionObject;

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


@Path("/suggest")


@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaJerseyServerCodegen", date = "2019-11-30T17:46:47.852Z[GMT]")public class SuggestApi  {
   private final SuggestApiService delegate;

   public SuggestApi(@Context ServletConfig servletContext) {
      SuggestApiService delegate = null;

      if (servletContext != null) {
         String implClass = servletContext.getInitParameter("SuggestApi.implementation");
         if (implClass != null && !"".equals(implClass.trim())) {
            try {
               delegate = (SuggestApiService) Class.forName(implClass).newInstance();
            } catch (Exception e) {
               throw new RuntimeException(e);
            }
         } 
      }

      if (delegate == null) {
         delegate = SuggestApiServiceFactory.getSuggestApi();
      }

      this.delegate = delegate;
   }

    @POST
    
    @Consumes({ "application/json" })
    
    @Operation(summary = "Suggest a new option for lunch", description = "", tags={  })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "201", description = "Created"),
        
        @ApiResponse(responseCode = "400", description = "Bad Request") })
    public Response suggest(@Parameter(description = "Create a new vote with a particular name at a particular time." ,required=true) CreateSuggestionObject body

,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.suggest(body,securityContext);
    }
}
