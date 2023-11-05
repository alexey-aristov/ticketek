import { Component,OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addMonths, subMonths } from 'date-fns';

import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../api/services';
import { VenuesVenueIdEventsGet$Json$Params } from '../api/fn/events/venues-venue-id-events-get-json';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  
  constructor(private route: ActivatedRoute, private service: EventsService) {}

  venueId!: string;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.venueId = params.get('venueId')!;
      this.updateEvetsForDate(this.viewDate);
    });
  }

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  selectedEvent?: CalendarEvent;
  showModal: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    if (events.length > 0) {
      this.activeDayIsOpen = !this.activeDayIsOpen;
    } else {
      this.activeDayIsOpen = false;
    }
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.activeDayIsOpen = false;
    this.updateEvetsForDate(this.viewDate);
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.activeDayIsOpen = false;
    this.updateEvetsForDate(this.viewDate);
  }

  updateEvetsForDate(date:Date){
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var param = {
      venueId: parseInt(this.venueId),
      startDate: firstDay.toDateString(),
      endDate: lastDay.toDateString()} as VenuesVenueIdEventsGet$Json$Params;

    this.service.venuesVenueIdEventsGet$Json(param).subscribe(e => (this.events = e.map<CalendarEvent>(a=>
      {
        return {
          title: a.name!,
          start:new Date( a.date!),
          meta: {
            description: a.description!
        }} as CalendarEvent
      }
      )));
  }

  handleEventClick(event: CalendarEvent): void {
    this.selectedEvent = event;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
