import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient) { }

  modifDemandeTransaction(id:any,value:any){
    return  this.http.put(`https://localhost:44376/DemandeTransaction/UpdateDemandeTransaction?id=${id}&value=${value}`,"");

  }
  modifDemandePayement(id:any,value:any,idval:any){
    return  this.http.put(`https://localhost:44376/DemandePayement/UpdateDemandePayement?id=${id}&value=${value}&idval=${idval}`,"",{responseType:'text'});
  }
  modifierEmployee(id:any){
    return  this.http.delete(`https://localhost:44376/ManageUsers/activateEmployee?id=${id}`,{responseType:'text'});
  }
}
