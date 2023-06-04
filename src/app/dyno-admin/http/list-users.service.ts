import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor(private http:HttpClient) { }
  private url = "https://localhost:44376/ManageUsers";
private url2 = "https://localhost:44376"
  getUsers(role:any,type:any){
   return  this.http.get(`${this.url}/GetUsers?role=${role}&type=${type}`)
  }
  getdemandes(id:string){
    return this.http.get(`${this.url2}/DemandeTransaction/getDemandeTransactionByEmployer?Id=${id}`);
  }
  getAllDemandesTransaction(){
    return this.http.get(`${this.url2}/DemandeTransaction/getDemandesTransaction`);
  }
  getAllDemandesPayement(){
    return this.http.get(`https://localhost:44376/DemandePayement/getDemandesPayement`);
  }
}
