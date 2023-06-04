import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListService } from '../../_http/list.service';
import { UpdateService } from '../../_http/update.service';
import { UpdateTicketComponent } from '../../categories/update-ticket/update-ticket.component';
import { SnackbarService } from '../../service/snackbar.service';
import { addRoleDto } from '../../Models/addRoleDto';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent {
  constructor(private fb:FormBuilder ,private update:UpdateService,private snackbar:SnackbarService,
    public dialogRef: MatDialogRef<UpdateTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.input =  [
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
    roleForm! :FormGroup ;

    ngOnInit(): void {
      console.log(this.data)
      this.roleForm = this.fb.group(
        {
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
    inputs:any;
    input:any;

    onNoClick(): void {
      this.dialogRef.close();
    }

    

   
      
    

    addRole = new addRoleDto();

    addnewRole(){

      //const myCheckboxValues = Object.assign(new addRoleDto(), this.RoleForm.value);
     if(!this.roleForm.invalid)
        {
            this.addRole.roleName= this.data.name;
            const checkedCheckboxes = Object.keys(this.roleForm.value).filter(key => this.roleForm.value[key] === true);
            this.addRole.Permission = checkedCheckboxes ;
            this.addRole.idEmployer =this.data.id
            this.update.updateRoles(this.addRole).subscribe({
              next: (v) => console.log(v),
              error: (e) => { 
               console.error(e),
               this.snackbar.openSnackBarErrorSimple("failed to update")
              },
              complete: () => {
                this.snackbar.openSnackBarSuccess();
              }
             }) 
            
        }
        this.dialogRef.close();

    }
}
