import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer } from '../models/Employer';
import { shopowner } from '../models/shopowner';
import { TransactionModel } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class AddUsersService {
  constructor(private http:HttpClient) { }
  private url = "https://localhost:44376/Register";
  addEmployer(employer:Employer){
    return  this.http.post(`${this.url}/RegisterEmployer`,employer);
  }
  addShopowner(shopowner:shopowner){
    return  this.http.post(`${this.url}/RegisterShopowner`,shopowner);
  }
  addAccount(secret:any,iduser:any){
    return  this.http.post(`https://localhost:44376/account/addAccount?secret=${secret}&mail=${iduser}`,"");
  }
  addTransaction(transaction:TransactionModel){
    var res = {
      idEmployer: transaction.IdEmployer,
      montant: transaction.montant,
      idverificateur: transaction.Idverificateur,
      iddemande :transaction.iddemande
    }
    console.log(res)
    return  this.http.post(`https://localhost:44376/Transaction/addTransactions`,res,{responseType:'text'});
  }
}
