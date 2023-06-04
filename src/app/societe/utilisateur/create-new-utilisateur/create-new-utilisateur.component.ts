import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Keypair } from '@solana/web3.js';
import { LoginService } from 'src/app/core/service/login.service';
import { Employee } from '../../Models/employee';
import { AddServiceService } from '../../_http/add-service.service';
import { AddUsersService } from 'src/app/dyno-admin/http/add-users.service';
import { encode } from 'bs58';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-create-new-utilisateur',
  templateUrl: './create-new-utilisateur.component.html',
  styleUrls: ['./create-new-utilisateur.component.scss']
})
export class CreateNewUtilisateurComponent implements OnInit {
  EmployerForm! :FormGroup ;
  phoneNumberPattern = /^[+]?[0-9]{8,15}$/;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

  ngOnInit(): void {
 
      this.EmployerForm = this.fb.group(
        {
         
          name : this.fb.control("",Validators.required),
          password  : this.fb.control("",[Validators.required,Validators.pattern(this.passwordPattern)]),
          walletpublickey  : this.fb.control("",Validators.required),
          numTel : this.fb.control("",[Validators.required,Validators.pattern(this.phoneNumberPattern)]),
          email : this.fb.control("",[Validators.required,Validators.email]),
          role:this.fb.control("employee")

        }

      )
    

    
    
    this.createAccount()
  }
  constructor(
    private AddaccountService:AddUsersService,
    private download:LoginService,
    public snackBar: SnackbarService,
    private router: Router,
    private fb:FormBuilder , 
    private route: ActivatedRoute, 
    private add:AddServiceService
    ){
      this.titre="societe";
      this.inputs =  [
      {label:"name",name:"nomEmployer"},
      {label:"password",name:"mot de passe"},
      {label:"numTel",name:"numeroTelephone"},
      {label:"email",name:"adresseMail",type:"email"},
    ];
 
  }
 
  Account:any;
  titre:any;
  type:any;
  inputs:any[]=[]
address:any;
 


  RegisterEmployee(){
   const employee = Object.assign(new Employee(), this.EmployerForm.value);
   console.log(employee)
   this.add.addEmployee(employee).subscribe(
    {
      next:(v)=>{
        console.log(v)
      },
      error: (e) => {
        console.log(e.status)  
        if (e.status == 200 ){
          this.router.navigate(['/societe/utilisateurs']);
          this.snackBar.openSnackBarSuccess()
          this.addAccount(this.address,this.EmployerForm.value.email);
        }else{
          this.snackBar.openSnackBarError(e.error.errors)
        }
       
      },
    }
   )
  }
  addAccount(address:any,mail:any){
    this.AddaccountService.addAccount(address,mail).subscribe({
      next:(v)=>{
        console.log(v)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  createAccount(){
    this.Account = new Keypair();
    console.log(this.Account)
      this.EmployerForm.patchValue({
        walletpublickey:this.Account.publicKey
      }); 
    this.address = encode(this.Account.secretKey);
  }
  save(){
    this.download.saveFile(this.Account).subscribe(
      {
        next (value) {
            console.log(value)
        },
        error(err) {
            console.log(err)
        },
      }
    )
  }

}
