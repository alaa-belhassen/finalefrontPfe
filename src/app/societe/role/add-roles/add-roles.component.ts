import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { ConfirmdemandeComponent } from '../../utilisateur/confirmdemande/confirmdemande.component';
import { demandeTransaction } from '../../Models/demandeTransaction';
import { addRoleDto } from '../../Models/addRoleDto';
import { permission } from '../../Models/permission';
import { AddServiceService } from '../../_http/add-service.service';

import { SnackbarService } from '../../service/snackbar.service';
import { local } from 'd3-selection';
@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent {
  RoleForm! :FormGroup ;
  
  ngOnInit(): void {
  
      this.RoleForm = this.fb.group(
        {
          nomRole : this.fb.control("",Validators.required),
          createManagerRH : this.fb.control(false),
          createManagerFacturation  : this.fb.control(false),
          createEmployee : this.fb.control(false),
          refillAllWallet : this.fb.control(false),
          refillWallet : this.fb.control(false),
          accessHistorieFromEmployerToEmployee : this.fb.control(false),
          accessHistorieFromDynoToEmployer : this.fb.control(false),
          refillEmployerWallet : this.fb.control(false),
        }
      )
    }
    
      
    
 
  
  constructor(
    public snackBar: SnackbarService,
    private router: Router,
    private fb:FormBuilder , 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service:AddServiceService,
    ){
    this.route.url.subscribe((res:any)=> this.type = res[0].path );
      this.inputs =  [
      {label:"createManagerRH",name:"createManagerRH"},
      {label:"createManagerFacturation",name:"createManagerFacturation"},
      {label:"createEmployee",name:"createEmployee"},
      {label:"refillAllWallet",name:"refillAllWallet"},
      {label:"refillWallet",name:"refillWallet"},
      {label:"accessHistorieFromEmployerToEmployee",name:"accessHistorieFromEmployerToEmployee"},
      {label:"accessHistorieFromDynoToEmployer",name:"accessHistorieFromDynoToEmployer"},
      {label:"refillEmployerWallet",name:"refillEmployerWallet"},

    ];
  }
 
  openDialog(): void {
    let dialogRef = this.dialog.open(ConfirmdemandeComponent, {
      width: '800px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result)
          this.addnewRole()
    });
  }

  demande = new demandeTransaction();
  list=["one","deux"]
  list2=["one","deux"]
  titre:any;
  type:any;
  inputs:any[]=[]
  val:any;
  val2:any;
  addRole = new addRoleDto();
  permission = new permission()

  

  addnewRole(){

    //const myCheckboxValues = Object.assign(new addRoleDto(), this.RoleForm.value);
   if(!this.RoleForm.invalid)
      {
          
          var token = localStorage.getItem("Token");
          var Id;
        if(token){
          var decodedToken:any = jwt_decode(token); 
          
          Id = decodedToken.Id;
        }

          console.log('ok');
          this.addRole.roleName= this.RoleForm.value.nomRole;
          const checkedCheckboxes = Object.keys(this.RoleForm.value).filter(key => this.RoleForm.value[key] === true);
          this.addRole.Permission = checkedCheckboxes ;
          this.addRole.idEmployer = Id.toString();
          console.log(this.addRole);
          
          this.service.addRole(this.addRole).subscribe({
            next: (v) => console.log(v),
            error: (e) => { this.snackBar.openSnackBarErrorSimple("role existe deja")
             console.error(e)},
            complete: () => {
              this.router.navigate(['..'],{relativeTo:this.route});
              this.snackBar.openSnackBarSuccess();
            }
           }) 
          
      }else{
        this.snackBar.openSnackBarError(this.RoleForm.invalid)
      }
  }
}
