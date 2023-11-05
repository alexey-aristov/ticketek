/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventCreateModel } from '../../models/event-create-model';
import { EventModel } from '../../models/event-model';

export interface EventsPost$Plain$Params {
      body?: EventCreateModel
}

export function eventsPost$Plain(http: HttpClient, rootUrl: string, params?: EventsPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<EventModel>> {
  const rb = new RequestBuilder(rootUrl, eventsPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EventModel>;
    })
  );
}

eventsPost$Plain.PATH = '/events';
