import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { demandePayement } from '../models/demandepayement';

@Injectable({
  providedIn: 'root'
})
export class GetMethodesService {
  constructor(private http:HttpClient) { }

  adddemandePayement(demande:demandePayement){
    return  this.http.post(`https://localhost:44376/DemandePayement/DemandeTransaction`,demande);
  }
  getdemandePayementByShopowner(id:any){
    return  this.http.get(`https://localhost:44376/DemandePayement/getDemandePayementByShopowner?Id=${id}`);
  }
  getdemandePayementById(id:any){
    return  this.http.get(`https://localhost:44376/DemandePayement/getDemandePayementById?Id=${id}`);
  }
}

