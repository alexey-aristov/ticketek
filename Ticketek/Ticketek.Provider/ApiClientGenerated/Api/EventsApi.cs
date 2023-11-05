using System;
using System.Collections.Generic;
using RestSharp;
using IO.Swagger.Client;
using IO.Swagger.Model;

namespace IO.Swagger.Api
{
    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public interface IEventsApi
    {
        /// <summary>
        ///  
        /// </summary>
        /// <param name="body"></param>
        /// <returns>EventModel</returns>
        EventModel EventsPost (EventCreateModel body);
        /// <summary>
        ///  
        /// </summary>
        /// <param name="venueId"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns>List&lt;EventModel&gt;</returns>
        List<EventModel> VenuesVenueIdEventsGet (long? venueId, DateTime? startDate, DateTime? endDate);
    }
  
    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public class EventsApi : IEventsApi
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="EventsApi"/> class.
        /// </summary>
        /// <param name="apiClient"> an instance of ApiClient (optional)</param>
        /// <returns></returns>
        public EventsApi(ApiClient apiClient = null)
        {
            if (apiClient == null) // use the default one in Configuration
                this.ApiClient = Configuration.DefaultApiClient; 
            else
                this.ApiClient = apiClient;
        }
    
        /// <summary>
        /// Initializes a new instance of the <see cref="EventsApi"/> class.
        /// </summary>
        /// <returns></returns>
        public EventsApi(String basePath)
        {
            this.ApiClient = new ApiClient(basePath);
        }
    
        /// <summary>
        /// Sets the base path of the API client.
        /// </summary>
        /// <param name="basePath">The base path</param>
        /// <value>The base path</value>
        public void SetBasePath(String basePath)
        {
            this.ApiClient.BasePath = basePath;
        }
    
        /// <summary>
        /// Gets the base path of the API client.
        /// </summary>
        /// <param name="basePath">The base path</param>
        /// <value>The base path</value>
        public String GetBasePath(String basePath)
        {
            return this.ApiClient.BasePath;
        }
    
        /// <summary>
        /// Gets or sets the API client.
        /// </summary>
        /// <value>An instance of the ApiClient</value>
        public ApiClient ApiClient {get; set;}
    
        /// <summary>
        ///  
        /// </summary>
        /// <param name="body"></param> 
        /// <returns>EventModel</returns>            
        public EventModel EventsPost (EventCreateModel body)
        {
            
    
            var path = "/events";
            path = path.Replace("{format}", "json");
                
            var queryParams = new Dictionary<String, String>();
            var headerParams = new Dictionary<String, String>();
            var formParams = new Dictionary<String, String>();
            var fileParams = new Dictionary<String, FileParameter>();
            String postBody = null;
    
                                                postBody = ApiClient.Serialize(body); // http body (model) parameter
    
            // authentication setting, if any
            String[] authSettings = new String[] {  };
    
            // make the HTTP request
            IRestResponse response = (IRestResponse) ApiClient.CallApi(path, Method.POST, queryParams, postBody, headerParams, formParams, fileParams, authSettings);
    
            if (((int)response.StatusCode) >= 400)
                throw new ApiException ((int)response.StatusCode, "Error calling EventsPost: " + response.Content, response.Content);
            else if (((int)response.StatusCode) == 0)
                throw new ApiException ((int)response.StatusCode, "Error calling EventsPost: " + response.ErrorMessage, response.ErrorMessage);
    
            return (EventModel) ApiClient.Deserialize(response.Content, typeof(EventModel), response.Headers);
        }
    
        /// <summary>
        ///  
        /// </summary>
        /// <param name="venueId"></param> 
        /// <param name="startDate"></param> 
        /// <param name="endDate"></param> 
        /// <returns>List&lt;EventModel&gt;</returns>            
        public List<EventModel> VenuesVenueIdEventsGet (long? venueId, DateTime? startDate, DateTime? endDate)
        {
            
            // verify the required parameter 'venueId' is set
            if (venueId == null) throw new ApiException(400, "Missing required parameter 'venueId' when calling VenuesVenueIdEventsGet");
            
    
            var path = "/venues/{venueId}/events";
            path = path.Replace("{format}", "json");
            path = path.Replace("{" + "venueId" + "}", ApiClient.ParameterToString(venueId));
    
            var queryParams = new Dictionary<String, String>();
            var headerParams = new Dictionary<String, String>();
            var formParams = new Dictionary<String, String>();
            var fileParams = new Dictionary<String, FileParameter>();
            String postBody = null;
    
             if (startDate != null) queryParams.Add("startDate", ApiClient.ParameterToString(startDate)); // query parameter
 if (endDate != null) queryParams.Add("endDate", ApiClient.ParameterToString(endDate)); // query parameter
                                        
            // authentication setting, if any
            String[] authSettings = new String[] {  };
    
            // make the HTTP request
            IRestResponse response = (IRestResponse) ApiClient.CallApi(path, Method.GET, queryParams, postBody, headerParams, formParams, fileParams, authSettings);
    
            if (((int)response.StatusCode) >= 400)
                throw new ApiException ((int)response.StatusCode, "Error calling VenuesVenueIdEventsGet: " + response.Content, response.Content);
            else if (((int)response.StatusCode) == 0)
                throw new ApiException ((int)response.StatusCode, "Error calling VenuesVenueIdEventsGet: " + response.ErrorMessage, response.ErrorMessage);
    
            return (List<EventModel>) ApiClient.Deserialize(response.Content, typeof(List<EventModel>), response.Headers);
        }
    
    }
}
