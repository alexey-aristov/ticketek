/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VenueModel } from '../../models/venue-model';

export interface VenuesGet$Plain$Params {
}

export function venuesGet$Plain(http: HttpClient, rootUrl: string, params?: VenuesGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<VenueModel>>> {
  const rb = new RequestBuilder(rootUrl, venuesGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<VenueModel>>;
    })
  );
}

venuesGet$Plain.PATH = '/venues';
