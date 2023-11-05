using Microsoft.EntityFrameworkCore;
using Ticketek.Api.Entities;

namespace Ticketek.Api
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Venue> Venues { get; set; }

        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Venue>().HasKey(e => e.Id);
            modelBuilder.Entity<Venue>().HasIndex(e => new { e.Name, e.Location }).IsUnique();

            modelBuilder.Entity<Event>().HasKey(e => e.Id);
            modelBuilder.Entity<Event>().HasIndex(e => new { e.Name, e.Date, e.VenueId }).IsUnique();
            modelBuilder.Entity<Event>().HasIndex(e => e.Date);

            base.OnModelCreating(modelBuilder);
        }

    }
}
