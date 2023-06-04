import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';
import { UsersDto } from 'src/app/shared/models/UsersDto';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  userFormGroup! :FormGroup ;
  constructor( private snackbar:SnackbarService,private fb:FormBuilder , private service: LoginService ,private route:ActivatedRoute, private router: Router)
  {}
  ngOnInit(): void {
    this.userFormGroup = this.fb.group(
      {
        email : this.fb.control("",[Validators.required,Validators.email]),
        Confirmpassword1 : this.fb.control("",Validators.required),
        Confirmpassword : this.fb.control("",Validators.required),
      }
    )
  }

reset(){
    var email = this.userFormGroup.value.email.toString();
    var password = this.userFormGroup.value.Confirmpassword.toString();
    var password1 = this.userFormGroup.value.Confirmpassword1.toString();
    if (password == password1){
      console.log(password)
      console.log(email)

      this.service.reset(email,password).subscribe(
        {
          next:(v)=> {
            this.snackbar.openSnackBarErrorSimple(v);
            this.router.navigate(['']);
          },
          error:(err)=>console.log(err),
          
        }
      )
    }else{
      this.snackbar.openSnackBarErrorSimple("les mot de passe ne sont pas Identique")
    }
}
   
}
