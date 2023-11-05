namespace Ticketek.Api.Entities
{
    public class Event
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public long VenueId { get; set; }
        public Venue Venue { get; set; }
    }
}
