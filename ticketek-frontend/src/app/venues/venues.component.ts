import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VenuesService } from '../api/services';
import { VenueModel } from '../api/models';

interface Venue {
  id: number
  title: string;
  description: string;
}

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent {
  venues: VenueModel[] = [];

  ngOnInit(): void {
    this.service.venuesGet$Json().subscribe(v => (this.venues = v));
  }

  constructor(private router: Router, private service: VenuesService) {}

  onEventClick(venue: VenueModel): void {
    this.router.navigate(['/calendar', venue.id]);
  }
}
