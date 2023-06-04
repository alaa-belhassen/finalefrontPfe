import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient){ }
  private Url = "https://localhost:44376/Authentification";
  
  public Login(Users:any){
    return this.http.post(`${this.Url}/login`,Users);
  } 
  
  public balance(publicKey:any){
    const data = {
      adress: publicKey.toString(),
    };
    return this.http.post(`http://localhost:3201/getAccountInfo`,data)
  }
  public historique(publicKey:any,nbr:any){
  
       const data = {
        adress: publicKey.toString(),
        nbr: nbr
       }
      ;
    
    

    return this.http.post(`http://localhost:3201/historique`,data)
  }
  public TransactionDetails(signature:any){
    const data = {
      signature: signature.toString(),
    };
    return this.http.post(`http://localhost:3201/detailsTransaction`,data)
  }
  
  public saveFile(Account:any){
    const data = {
      publicKey: Account.publicKey,
      secretKey: Account.secretKey,
    };
    return this.http.post(`http://localhost:3201/saveFile`,data,{responseType:'text'})
  }

  public getKey(id:any){
  
    return this.http.get(`https://localhost:44376/account/getAccountByID?id=${id}`)
  }
  getAccountName(list:any){
    
    return this.http.post(`https://localhost:44376/account/GetAccountNames`,list)
  }

  reset(email:any,pass:any){
    const data =  {
      email: email,
      password: pass
    }
    return this.http.post(`https://localhost:44376/Register/ResetPassword`,data,{responseType:"text"})
  }

  modifier(email:any,oldpass:any,pass:any){
    const data =  {
      mail: email,
      encienMotDePasse: oldpass,
      motDePasse: pass
    }
    return this.http.post(`https://localhost:44376/Register/modifierMotDePasse`,data,{responseType:"text"})
  }
}
