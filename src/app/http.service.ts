import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_OFFERS = "https://60bd1033b8ab3700175a0188.mockapi.io/api/v1/offers";
  API_PLANS = "https://60bd1033b8ab3700175a0188.mockapi.io/api/v1/plans";
  constructor(
    private httpClient: HttpClient
  ) { 
  }

  
  getOffers(): Observable<any> {
    return this.httpClient.get(this.API_OFFERS);
  }

  getPlans(): Observable<any> {
    return this.httpClient.get(this.API_PLANS);
  }
}
