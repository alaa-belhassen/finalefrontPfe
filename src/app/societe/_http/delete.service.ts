import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FireEmploymentDto } from '../Models/fireEmploymentDto';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http:HttpClient) { }

  deleteRole(role:string){
    return  this.http.delete(` https://localhost:44376/Employee/DeletePermission?role=${role}`,{responseType: 'text'});
  }
  deleteUtilisateur(user:FireEmploymentDto){
    const options = {
      body: user // Set the user object as the request body
    };
    return  this.http.delete(`  https://localhost:44376/Employment/FireEmployee`,options);
  }
  deleteCategorie(id:string){
    return  this.http.delete(`https://localhost:44376/Categorie/DeleteCategorie?id=${id}`,{responseType: 'text'});
  }
}
