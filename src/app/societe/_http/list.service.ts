import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }
  url = "https://localhost:44376/ManageUsers";
  getRoles(id:any){
    return  this.http.get(`${this.url}/GetRoles?id=${id}`);
  }
  getUtilisateurs(id:string){
    return  this.http.get(`https://localhost:44376/Employment/GetEmployement?id=${id}`);
  }
  getAllCategorie(id:any){
    return  this.http.get(`https://localhost:44376/Categorie/getAllCategorie?id=${id}`);
  }
  getAllTicket(id:string){
    return  this.http.get(`https://localhost:44376/Categorie/getAllTicket?id=${id}`);
  }
  getRoleByUserID(id:string){
    return  this.http.get(`https://localhost:44376/Employee/GetRolesByUserId?id=${id}`);
  }
  getUserById(id:string){
    return  this.http.get(`https://localhost:44376/ManageUsers/GetUsersbYid?id=${id}`);
  }
  getCategorieById(id:string){
    return  this.http.get(`https://localhost:44376/Categorie/getCategorieById?id=${id}`);
  }
  getUserById2(id:string,idemployer:string){
    return  this.http.get(`https://localhost:44376/ManageUsers/GetUsersbYid2?id=${id}&idemployer=${idemployer}`);
  }
  getPayementById(id:any,idsociete:any){
    return  this.http.post(`https://localhost:44376/Employment/getEmployeePayement?id=${id}&idsociete=${idsociete}`,"");
  }
}


