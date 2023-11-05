/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventModel } from '../../models/event-model';

export interface VenuesVenueIdEventsGet$Json$Params {
  venueId: number;
  startDate?: string;
  endDate?: string;
}

export function venuesVenueIdEventsGet$Json(http: HttpClient, rootUrl: string, params: VenuesVenueIdEventsGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventModel>>> {
  const rb = new RequestBuilder(rootUrl, venuesVenueIdEventsGet$Json.PATH, 'get');
  if (params) {
    rb.path('venueId', params.venueId, {});
    rb.query('startDate', params.startDate, {});
    rb.query('endDate', params.endDate, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<EventModel>>;
    })
  );
}

venuesVenueIdEventsGet$Json.PATH = '/venues/{venueId}/events';
