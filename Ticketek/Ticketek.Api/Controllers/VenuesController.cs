using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketek.Api.Entities;
using Ticketek.Api.Models;

namespace Ticketek.Api.Controllers
{
    [ApiController]
    public class VenuesController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public VenuesController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("venues")]
        public async Task<ICollection<VenueModel>> GetAllVenues()
        {
            return await dbContext.Venues.Select(x => new VenueModel()
            {
                Id = x.Id,
                Name = x.Name,
                Capacity = x.Capacity,
                Location = x.Location
            }).ToListAsync();
        }

        [HttpPost("venues")]
        public async Task<VenueModel> CreateVenueAsync(VenueCreateModel venueCreateModel)
        {
            var newVenue = new Venue()
            {
                Name = venueCreateModel.Name,
                Capacity = venueCreateModel.Capacity,
                Location = venueCreateModel.Location
            };

            dbContext.Add(newVenue);
            await dbContext.SaveChangesAsync();

            return new VenueModel()
            {
                Id = newVenue.Id,
                Name = newVenue.Name,
                Capacity = newVenue.Capacity,
                Location = newVenue.Location
            };
        }
    }
}