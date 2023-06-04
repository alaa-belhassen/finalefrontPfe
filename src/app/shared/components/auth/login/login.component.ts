import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/service/login.service';
import { UsersDto } from 'src/app/shared/models/UsersDto';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
import { DarkmodeService } from 'src/app/shared/services/darkmode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userFormGroup! :FormGroup ;
  user:UsersDto={email:"",password: ""}
  constructor(private shared:DarkmodeService, private snackbar:SnackbarService,private fb:FormBuilder , private service: LoginService ,private route:ActivatedRoute, private router: Router)
  {
    shared.data2$.subscribe(
      (res:boolean)=>{
        this.spin=res;
        console.log(res);
      }
    )
  }
  ngOnInit(): void {

    this.userFormGroup = this.fb.group(
      {
        email : this.fb.control("",[Validators.required,Validators.email]),
        password : this.fb.control("",Validators.required),
      }
    )
  }
  spin=false;
  login(){
    this.user.email=this.userFormGroup.value.email.trim();
    this.user.password=this.userFormGroup.value.password.trim()
    if(this.spin == false){
    if(!this.userFormGroup.invalid ){
      
      this.shared.setspin(true);
      this.service.Login(this.user).subscribe({

        next:(response:any) => {  
           
          console.log(response.token);
          var decodedToken:any = jwt_decode(response.token); 
              if (decodedToken.role.includes('superuser')){
                console.log('ok')
                this.router.navigate(['dynoAdmin'],{relativeTo:this.route});
              }
              if (decodedToken.role.includes("shopowner")){
                this.router.navigate(['commercant'],{relativeTo:this.route});
              }
              if (decodedToken.role.includes("employer")){
                this.router.navigate(['societe'],{relativeTo:this.route});

              }
             
          localStorage.setItem('email',this.user.email)
          localStorage.setItem('Token',response.token);
          localStorage.setItem('role',decodedToken.role);
          this.snackbar.openSnackBarSuccess();
      },
      error:(err)=>{
        this.shared.setspin(false);
        console.log(err);
        this.snackbar.openSnackBarErrorSimple(err.error.errors[0])
      }
    })
  }else{
    this.snackbar.openSnackBarErrorSimple("Formulaire n'est pas valide")
  }}
    }
}
