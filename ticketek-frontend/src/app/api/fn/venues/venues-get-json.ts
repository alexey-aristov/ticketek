/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VenueModel } from '../../models/venue-model';

export interface VenuesGet$Json$Params {
}

export function venuesGet$Json(http: HttpClient, rootUrl: string, params?: VenuesGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<VenueModel>>> {
  const rb = new RequestBuilder(rootUrl, venuesGet$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<VenueModel>>;
    })
  );
}

venuesGet$Json.PATH = '/venues';
