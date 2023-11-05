namespace Ticketek.Api.Entities
{
    public class Venue
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public int Capacity { get; set; }

        public string Location { get; set; }

        public ICollection<Event> Events { get; set; }

    }
}
