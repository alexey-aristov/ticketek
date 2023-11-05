using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketek.Api.Entities;
using Ticketek.Api.Models;

namespace Ticketek.Api.Controllers
{
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public EventsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("venues/{venueId}/events")]
        public async Task<ICollection<EventModel>> GetEvents(long venueId, DateTime startDate, DateTime endDate)
        {
            return await dbContext.Events
                .Where(x => x.Date > startDate && x.Date < endDate && x.VenueId == venueId)
                .Select(x => new EventModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Date = x.Date,
                }).ToListAsync();
        }

        [HttpPost("events")]
        public async Task<EventModel> CreateEventAsync(EventCreateModel eventCreate)
        {
            var newEvent = new Event()
            {
                Name = eventCreate.Name,
                Date = eventCreate.Date,
                Description = eventCreate.Description,
                VenueId = eventCreate.VenueId
            };

            dbContext.Events.Add(newEvent);
            await dbContext.SaveChangesAsync();

            return new EventModel()
            {
                Id = newEvent.Id,
                Name = newEvent.Name,
                Description = newEvent.Description,
                Date = newEvent.Date
            };
        }
    }
}
