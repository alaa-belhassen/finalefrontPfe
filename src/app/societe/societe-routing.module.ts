import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocieteComponent } from './societe.component';
import { OverviewComponent } from './overview/overview.component';
import { CategorieComponent } from './categories/categorie/categorie.component';
import { RolesComponent } from './role/roles/roles.component';
import { UtilisateursComponent } from './utilisateur/utilisateurs/utilisateurs.component';
import { RedirectComponent } from './utilisateur/redirect/redirect.component';
import { CreeUtilisateurComponent } from './utilisateur/cree-utilisateur/cree-utilisateur.component';
import { DemandesComponent } from './demande/demandes/demandes.component';
import { RedirectDemandesComponent } from './demande/redirect-demandes/redirect-demandes.component';
import { CreateDemandeComponent } from './demande/create-demande/create-demande.component';
import { SqueletteRolesComponent } from './role/squelette-roles/squelette-roles.component';
import { AddRolesComponent } from './role/add-roles/add-roles.component';
import { SettingstemplateComponent } from '../shared/components/settings/settingstemplate/settingstemplate.component';
import { AccountComponent } from '../shared/components/settings/account/account.component';
import { LangueComponent } from '../shared/components/settings/langue/langue.component';
import { ApearanceComponent } from '../shared/components/settings/apearance/apearance.component';
import { ChoisirCreationTypeComponent } from './utilisateur/choisir-creation-type/choisir-creation-type.component';
import { CreateNewUtilisateurComponent } from './utilisateur/create-new-utilisateur/create-new-utilisateur.component';
import { CreeCategorieComponent } from './categories/cree-categorie/cree-categorie.component';
import { RedirectCategorieComponent } from './categories/redirect-categorie/redirect-categorie.component';
import { DetailsTransactionComponent } from '../shared/components/details-transaction/details-transaction.component';
import { TransactionhistoryComponent } from '../shared/components/transactionhistory/transactionhistory.component';
import { Employer } from '../dyno-admin/models/Employer';
import { SolanaComponent } from '../commercant/components/solana/solana.component';
import { DetailsUtilisateurComponent } from './utilisateur/details-utilisateur/details-utilisateur.component';
import { ListpayementEmployeeComponent } from './utilisateur/listpayement-employee/listpayement-employee.component';

const routes: Routes = [{ path: '', component: SocieteComponent,children:[
  { path: '', component: OverviewComponent },
  {path:'transactionDetails/:id',component:DetailsTransactionComponent},
  {path:'PayementHistorique/:id',component:ListpayementEmployeeComponent},
  {path:'Alltransaction',component:TransactionhistoryComponent},
  { path: 'overview', component: OverviewComponent },
  { path: 'categorie', component: RedirectCategorieComponent ,children:[
    { path: 'creeCategorie', component: CreeCategorieComponent },
    { path: '', component: CategorieComponent },

  ]},
  { path: 'roles', component: SqueletteRolesComponent ,children:[
    { path: '', component: RolesComponent },
    { path: 'creeRoles', component: AddRolesComponent },
  ]},
  { path: 'payer/:id', component: DetailsUtilisateurComponent },
  { path: 'payer', component: SolanaComponent },
  { path: 'utilisateurs', component: RedirectComponent , children:[
    {path:'', component:UtilisateursComponent},
    {path:'choisirType', component:ChoisirCreationTypeComponent},
    {path:'creeUtilisateur', component:CreeUtilisateurComponent},
    {path:'creeNewUtilisateur', component:CreateNewUtilisateurComponent},

  ] }
  ,  { path: 'demande', component: RedirectDemandesComponent ,children:[
    { path: '', component: DemandesComponent },
    { path: 'createDemande', component: CreateDemandeComponent },
  ] },
  { path: 'settings', component: SettingstemplateComponent , children :[
    {path:'',component:ApearanceComponent},
    {path:'account',component:AccountComponent},
    {path:'langue',component:LangueComponent},
    { path: 'apearance', component: ApearanceComponent },

  ] },


]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocieteRoutingModule { }
