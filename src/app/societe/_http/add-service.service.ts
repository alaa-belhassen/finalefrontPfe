import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { demandeTransaction } from '../Models/demandeTransaction'
import { addRoleDto } from '../Models/addRoleDto';
import { addEmploymentDto } from '../Models/addEmpoymentDto';
import { Employee } from '../Models/employee';
@Injectable({
  providedIn: 'root'
})
export class AddServiceService {
  url="https://localhost:44376"
  constructor(private http:HttpClient) { }
  addDemandeTransaction(demande:demandeTransaction){
    return  this.http.post(`${this.url}/DemandeTransaction/DemandeTransaction`,demande,{responseType: 'text'});
  }
  addRole(role:addRoleDto){
    return  this.http.post(`${this.url}/Employee/CreateRole`,role,{responseType: 'text'});
  }
  addEmployment(employment:addEmploymentDto){
    return  this.http.post(`https://localhost:44376/Employment/AddEmployment`,employment);
  }
  addEmployeeToPost(mail:string,role:string){
    return  this.http.post(`https://localhost:44376/Employee/AddToPost?email=${mail}&role=${role}`,"");
  }
  addEmployee(employee:Employee){
    return  this.http.post(`https://localhost:44376/Register/RegisterEmployee`,employee);
  }
  addPayement(idemployer:any,idemployee:any,days:string,montant:string){
    var payement = {
      idEmployer : idemployer,
      idEmployee: idemployee,
      dayofwork: String(days),
      montant: montant

    }
    console.log(payement)
    return  this.http.post(`https://localhost:44376/Employment/addPayement`,payement,{responseType:"text"});
  }
  addCategorie(Categorie:any,id:any){
    var options={
      nameCateforie:Categorie.nomCategorie,
      nameTicket:Categorie.nomTicket,
      idEmployer:id
    }
    return  this.http.post(`https://localhost:44376/Categorie/addCategorie`,options,{responseType: 'text'});
  }
  addTicket(Ticket:any){
    var options={
      nameTicket:Ticket.nomTicket,
      prixTicket:Ticket.montant,
      idEmployer:Ticket.idEmployer
    }
    return  this.http.post(`https://localhost:44376/Categorie/addTicket`,options,{responseType: 'text'});
  }
}
