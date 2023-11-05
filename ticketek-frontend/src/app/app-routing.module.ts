import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { VenuesComponent } from './venues/venues.component';


const routes: Routes = [
  { path: '', component: VenuesComponent, pathMatch: 'full' },
  { path: 'calendar/:venueId', component: CalendarComponent },
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
