import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoCuenta } from '../Interfaces/mongodb.interface';

@Injectable({
  providedIn: 'root',
})
export class MongoConectionService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3200/db';
  post = 'http://localhost:3200/users';
  delete = 'http://localhost:3200/db/delete'

  GetData(): Observable<InfoCuenta> {
    return this.http.get<InfoCuenta>(this.url);
  }

  SendData(data: object): Observable<InfoCuenta> {
    return this.http.post<InfoCuenta>(this.post, data);
  }

  DeleteData(id: string){
    return this.http.delete(`http://localhost:3200/db/delete/${id}`)
  }

}
