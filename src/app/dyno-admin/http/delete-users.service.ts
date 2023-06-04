import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DeleteUsersService {
  constructor(private http:HttpClient) { }
  private url = "https://localhost:44376/ManageUsers";
  DeleteEmployer(id:any){
   return  this.http.delete(`https://localhost:44376/ManageUsers/BlockEmployer?id=${id}`,{responseType: 'text'})
  }
  DeleteShopowner(id:any){
    return  this.http.delete(`https://localhost:44376/ManageUsers/BlockShopowner?id=${id}`,{responseType: 'text'})
   }
  unblockEmployer(id:any){
    return  this.http.put(`https://localhost:44376/ManageUsers/unBlockEmployer?id=${id}`,"",{responseType: 'text'})

  }
  unblockShopowner(id:any){
    return  this.http.put(`https://localhost:44376/ManageUsers/unBlockShopowner?id=${id}`,"",{responseType: 'text'})
  }

  AnnulerEmployer(email:any){
    return  this.http.delete(`https://localhost:44376/ManageUsers/deleteEmployer?email=${email}`,{responseType: 'text'})

  }
  AnnulerShopowner(email:any){
    return  this.http.delete(`https://localhost:44376/ManageUsers/deleteShopowner?email=${email}`,{responseType: 'text'})

  }
  }
