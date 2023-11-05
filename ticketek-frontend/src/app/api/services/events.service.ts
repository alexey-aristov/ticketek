/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { EventModel } from '../models/event-model';
import { eventsPost$Json } from '../fn/events/events-post-json';
import { EventsPost$Json$Params } from '../fn/events/events-post-json';
import { eventsPost$Plain } from '../fn/events/events-post-plain';
import { EventsPost$Plain$Params } from '../fn/events/events-post-plain';
import { venuesVenueIdEventsGet$Json } from '../fn/events/venues-venue-id-events-get-json';
import { VenuesVenueIdEventsGet$Json$Params } from '../fn/events/venues-venue-id-events-get-json';
import { venuesVenueIdEventsGet$Plain } from '../fn/events/venues-venue-id-events-get-plain';
import { VenuesVenueIdEventsGet$Plain$Params } from '../fn/events/venues-venue-id-events-get-plain';

@Injectable({ providedIn: 'root' })
export class EventsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `venuesVenueIdEventsGet()` */
  static readonly VenuesVenueIdEventsGetPath = '/venues/{venueId}/events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `venuesVenueIdEventsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesVenueIdEventsGet$Plain$Response(params: VenuesVenueIdEventsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventModel>>> {
    return venuesVenueIdEventsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `venuesVenueIdEventsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesVenueIdEventsGet$Plain(params: VenuesVenueIdEventsGet$Plain$Params, context?: HttpContext): Observable<Array<EventModel>> {
    return this.venuesVenueIdEventsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EventModel>>): Array<EventModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `venuesVenueIdEventsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesVenueIdEventsGet$Json$Response(params: VenuesVenueIdEventsGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<EventModel>>> {
    return venuesVenueIdEventsGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `venuesVenueIdEventsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesVenueIdEventsGet$Json(params: VenuesVenueIdEventsGet$Json$Params, context?: HttpContext): Observable<Array<EventModel>> {
    return this.venuesVenueIdEventsGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<EventModel>>): Array<EventModel> => r.body)
    );
  }

  /** Path part for operation `eventsPost()` */
  static readonly EventsPostPath = '/events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eventsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  eventsPost$Plain$Response(params?: EventsPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<EventModel>> {
    return eventsPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `eventsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  eventsPost$Plain(params?: EventsPost$Plain$Params, context?: HttpContext): Observable<EventModel> {
    return this.eventsPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventModel>): EventModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eventsPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  eventsPost$Json$Response(params?: EventsPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<EventModel>> {
    return eventsPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `eventsPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  eventsPost$Json(params?: EventsPost$Json$Params, context?: HttpContext): Observable<EventModel> {
    return this.eventsPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventModel>): EventModel => r.body)
    );
  }

}
