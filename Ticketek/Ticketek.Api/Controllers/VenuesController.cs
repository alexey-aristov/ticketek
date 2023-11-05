using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            when (e.InnerException?.InnerException is SqlException sqlEx &&
              (sqlEx.Number == 2601 || sqlEx.Number == 2627))
            {
                var existing = await dbContext.Venues.SingleAsync(x=>x.Name == venueCreateModel.Name && x.Location == venueCreateModel.Location);
                return new VenueModel()
                {
                    Id = existing.Id,
                    Name = existing.Name,
                    Capacity = existing.Capacity,
                    Location = existing.Location
                };
            }

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