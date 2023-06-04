import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/service/login.service';
import { DarkmodeService } from 'src/app/dyno-admin/services/darkmode.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';

@Component({
  selector: 'app-apearance',
  templateUrl: './apearance.component.html',
  styleUrls: ['./apearance.component.scss'],
})
export class ApearanceComponent implements OnInit {
  constructor(private snackbar:SnackbarService,private login:LoginService,private service: DarkmodeService,private fb:FormBuilder ,public key:LoginService){
    this.service.data$.subscribe((res)=>console.log(res))
  }
  userFormGroup! :FormGroup ;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  ngOnInit(): void {
    this.userFormGroup = this.fb.group(
      {
        oldpassword : this.fb.control("",[Validators.required,Validators.pattern(this.passwordPattern)]),
        password1 : this.fb.control("",[Validators.required,Validators.pattern(this.passwordPattern)]),
        password : this.fb.control("",[Validators.required,Validators.pattern(this.passwordPattern)]),
      }
    )
   this.state = sessionStorage.getItem('dark') == 'true' ;
   var token = localStorage.getItem('Token');
   if ( token){
      var decodedToken:any= jwt_decode(token);   
      console.log(decodedToken)
      if(decodedToken){
        this.getKey(decodedToken.Id);
        this.email=decodedToken.email;
      }

   }
 
  }
  email:any;
  changepassword(){
    if(!this.userFormGroup.invalid){
    var oldpassword = this.userFormGroup.value.oldpassword.toString();
    var password = this.userFormGroup.value.password1.toString();
    var password1 = this.userFormGroup.value.password.toString();
    if (password == password1){
      this.login.modifier(this.email,oldpassword,password).subscribe({
        next:(v)=>{
          this.snackbar.openSnackBarSuccess()
          console.log(v);
        },
        error:(err) => {
          console.log(err)
          this.snackbar.openSnackBarErrorSimple("le mot de passe inserer est incorrect")
        }
      })

    }else{
      this.snackbar.openSnackBarErrorSimple("les motdepasse sont pas identiques")
    }
  }else{
    this.snackbar.openSnackBarErrorSimple("Formulaire Invalide")
  }
  }
  state=false
  secret :any;
  show=false;
  getKey(id:any){
    this.key.getKey(id).subscribe(
      { 
        next : (v) =>{
          this.secret = v;
          console.log(this.secret)
        } ,
        error : (err)=> console.log(err)
      }
    )
  }
  toggledarkmode(){
    this.service.setMessage(!this.state)
    this.state=!this.state;
    if(this.state)
      sessionStorage.setItem('dark','true');
    else
      sessionStorage.removeItem('dark');
  }
  state1=false
  id:any;
}
