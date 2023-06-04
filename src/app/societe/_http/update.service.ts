import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addEmploymentDto } from '../Models/addEmpoymentDto';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient){}
  updateCategorie(id:any,idemployer:any,Ticket:any){
    var options={
      idCategorie:id,
      idEmployer:idemployer,
      nameCateforie:Ticket.namecategorie,
      nameTicket:Ticket.nameTicket,
    }
    return  this.http.put(`https://localhost:44376/Categorie/updateCategorie`,options,{responseType: 'text'});
  }
  updateTicket(id:any,idemployer:any,Ticket:any){
    var options={
      idTicket:id,
      idEmployer:idemployer,
      nameTicket:Ticket.nameTicket,
      prixTicket:Ticket.prixTicket,
    }
    return  this.http.put(`https://localhost:44376/Categorie/updateTicket`,options,{responseType: 'text'});
  }

  updateRoles(role:any){
  
    return  this.http.put(`https://localhost:44376/Employee/updatePermission`,role,{responseType: 'text'});
  }
  updateEmployement(role:any,dataa:any){
    
    const data = {
      mailEmployee: dataa.mail,
      idEmployer: role.idEmployer,
      idCategorie: role.idcategorie,
      role: role.role,
      curentRole: dataa.curentRole.name
    }
    console.log(data)
    return  this.http.post(`https://localhost:44376/Employment/modifierEmployement`,data,{responseType: 'text'});
  }

}
