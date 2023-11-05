/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VenueCreateModel } from '../../models/venue-create-model';
import { VenueModel } from '../../models/venue-model';

export interface VenuesPost$Plain$Params {
      body?: VenueCreateModel
}

export function venuesPost$Plain(http: HttpClient, rootUrl: string, params?: VenuesPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<VenueModel>> {
  const rb = new RequestBuilder(rootUrl, venuesPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<VenueModel>;
    })
  );
}

venuesPost$Plain.PATH = '/venues';
