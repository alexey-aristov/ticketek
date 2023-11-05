namespace Ticketek.Api.Models
{
    public class EventCreateModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public long VenueId { get; set; }
    }
}
