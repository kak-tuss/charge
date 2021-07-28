import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}
  API_URL = 'https://60bd1033b8ab3700175a0188.mockapi.io/api/v1/payments';

  payment = {
    item: 'item name',
    name: 'user name',
    price: 1000
  };

  offer = {
    id: 1,
    amount: 2000
  };

  plan = {
    id: 1,
    name: 'Plan name'
  };

  handleSubmit(): any {
    console.log('submitting');
    this.httpClient.post<void>(this.API_URL, this.payment)
    .subscribe(() => {
      console.log('sent!');
      this.router.navigate(['/offers', {amount: this.offer.amount}]);
    });
  };

}
