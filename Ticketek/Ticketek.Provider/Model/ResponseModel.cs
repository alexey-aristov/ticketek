using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ticketek.Provider.Model
{
    class ResponseModel
    {
        public ICollection<Event> Events { get; set; }
        public ICollection<Venue> Venues { get; set; }
    }
}
