using Amazon.Lambda.Core;
using IO.Swagger.Api;
using System.Text.Json;
using Ticketek.Provider.Model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Ticketek.Provider;

public class Function
{
   
    public async Task FunctionHandler(ILambdaContext context)
    {
        var httpClient = new HttpClient();

        var result = await httpClient.GetStringAsync("https://teg-coding-challenge.s3.ap-southeast-2.amazonaws.com/events/event-data.json");

        var providerValues = JsonSerializer.Deserialize<ResponseModel>(result,new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        var venuesApi = new VenuesApi(new IO.Swagger.Client.ApiClient("https://wfh93atxta.execute-api.ap-southeast-2.amazonaws.com/dev"));
        var eventsApi = new EventsApi(new IO.Swagger.Client.ApiClient("https://wfh93atxta.execute-api.ap-southeast-2.amazonaws.com/dev"));

        var venuesCache = new Dictionary<long, long>();
       
        foreach (var providerVenue in providerValues.Venues)
        {
            try
            {
                var created = venuesApi.VenuesPost(new IO.Swagger.Model.VenueCreateModel
                {
                    Name = providerVenue.Name,
                    Location = providerVenue.Location,
                    Capacity = providerVenue.Capacity
                });

                venuesCache[providerVenue.Id] = created.Id!.Value;
                Console.WriteLine($"Venue created: {providerVenue.Name}");
            }
            catch
            {
                Console.WriteLine($"Error on creating venue {providerVenue.Name}");
            }
        }

        foreach(var providerEvent in providerValues.Events)
        {
            try
            {
                var created = eventsApi.EventsPost(new IO.Swagger.Model.EventCreateModel
                {
                    Name = providerEvent.Name,
                    Date = providerEvent.StartDate,
                    Description = providerEvent.Description,
                    VenueId = venuesCache[providerEvent.VenueId]
                });

                Console.WriteLine($"Event created: {providerEvent.Name}");
            }
            catch (Exception)
            {
                Console.WriteLine($"Error on creating event {providerEvent.Name}");
            }
        }

        Console.WriteLine("Provider sync finished");
    }
}
