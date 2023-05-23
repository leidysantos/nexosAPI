import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(
    private http: HttpClient
  ) { }

  productos(){
    return this.http.get<any>(
      `https://fakeapi.platzi.com/en/rest/products`
    );
  }

  docs(){
    return this.http.get<any>(
      `https://fakestoreapi.com/docs`
    );
  }
}
