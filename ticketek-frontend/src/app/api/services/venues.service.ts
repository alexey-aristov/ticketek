/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { VenueModel } from '../models/venue-model';
import { venuesGet$Json } from '../fn/venues/venues-get-json';
import { VenuesGet$Json$Params } from '../fn/venues/venues-get-json';
import { venuesGet$Plain } from '../fn/venues/venues-get-plain';
import { VenuesGet$Plain$Params } from '../fn/venues/venues-get-plain';
import { venuesPost$Json } from '../fn/venues/venues-post-json';
import { VenuesPost$Json$Params } from '../fn/venues/venues-post-json';
import { venuesPost$Plain } from '../fn/venues/venues-post-plain';
import { VenuesPost$Plain$Params } from '../fn/venues/venues-post-plain';

@Injectable({ providedIn: 'root' })
export class VenuesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `venuesGet()` */
  static readonly VenuesGetPath = '/venues';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `venuesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesGet$Plain$Response(params?: VenuesGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<VenueModel>>> {
    return venuesGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `venuesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesGet$Plain(params?: VenuesGet$Plain$Params, context?: HttpContext): Observable<Array<VenueModel>> {
    return this.venuesGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<VenueModel>>): Array<VenueModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `venuesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesGet$Json$Response(params?: VenuesGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<VenueModel>>> {
    return venuesGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `venuesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  venuesGet$Json(params?: VenuesGet$Json$Params, context?: HttpContext): Observable<Array<VenueModel>> {
    return this.venuesGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<VenueModel>>): Array<VenueModel> => r.body)
    );
  }

  /** Path part for operation `venuesPost()` */
  static readonly VenuesPostPath = '/venues';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `venuesPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  venuesPost$Plain$Response(params?: VenuesPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<VenueModel>> {
    return venuesPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `venuesPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  venuesPost$Plain(params?: VenuesPost$Plain$Params, context?: HttpContext): Observable<VenueModel> {
    return this.venuesPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<VenueModel>): VenueModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `venuesPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  venuesPost$Json$Response(params?: VenuesPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<VenueModel>> {
    return venuesPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `venuesPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  venuesPost$Json(params?: VenuesPost$Json$Params, context?: HttpContext): Observable<VenueModel> {
    return this.venuesPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<VenueModel>): VenueModel => r.body)
    );
  }

}
