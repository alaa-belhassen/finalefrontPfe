import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Notfound404Component } from './shared/components/notfound404/notfound404.component';
import { TokenExistGuard } from './core/guard/token-exist.guard';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ResetPasswordComponent } from './shared/components/auth/reset-password/reset-password.component';

const routes: Routes = [ 
{path:'',component:LoginComponent},
{path:'reset',component:ResetPasswordComponent},
{ path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
{ path: 'commercant', loadChildren: () => import('./commercant/private.module').then(m => m.PrivateModule),canActivate:[AuthGuard,TokenExistGuard],data:{role:'shopowner'}  },
{ path: 'dynoAdmin', loadChildren: () => import('./dyno-admin/dyno-admin.module').then(m => m.DynoAdminModule),canActivate:[AuthGuard,TokenExistGuard],data:{role:'superuser'} },
{ path: 'societe', loadChildren: () => import('./societe/societe.module').then(m => m.SocieteModule),canActivate:[AuthGuard,TokenExistGuard],data:{role:'employer'}  },
{path:'**',pathMatch: 'full' ,component:Notfound404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
