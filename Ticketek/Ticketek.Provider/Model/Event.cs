namespace Ticketek.Provider.Model
{
    class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public long VenueId {  get; set; }
    }
}
