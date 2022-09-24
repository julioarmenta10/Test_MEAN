import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {

  }

  public get(url: string) {
    return this.http.get(url);
  }

  public post(url: string, object: any) {
    return this.http.post(url, object);
  }


  public put(url: string, object: any) {
    return this.http.put(url, object);
  }
  public delete(url: string) {
    return this.http.delete(url);
  }
}
