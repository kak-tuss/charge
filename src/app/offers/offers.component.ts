import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map as rxmap } from 'rxjs/operators';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  selectedAmount: string = null;
  cards$ = new Observable<any>();

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  
  ngOnInit(): void {
    this.selectedAmount = this.route.snapshot.paramMap.get('amount');

    this.cards$ = this.getOffersAboveAmount();
    this.cards$.subscribe((data) => {
      console.log('hello', data);
    })
  }

  getOffersByPlans(): Observable<any> {
    return combineLatest([
      this.httpService.getOffers(),
      this.httpService.getPlans()
    ]).pipe(
      rxmap(([offers, plans]) => {
        return offers.map( offer => {
          let name = 'no name set';
          let planNames = plans.filter(plan => plan.id === offer.id);
          if (planNames.length) {
            name = planNames[0].name;
          }
          return {
            id: offer.id,
            amount: offer.amount,
            name: name
            }
        })
    })
  );
 }

 getOffersAboveAmount(): Observable<any> {
  return this.getOffersByPlans().pipe(
    rxmap(cards => cards.filter(card => card.offer > this.selectedAmount))
  )
}

}
