import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {}

  url = "http://localhost:5000/api/items"

  getData(body:any) {

   return this.http.post(this.url,body)

  }

}
