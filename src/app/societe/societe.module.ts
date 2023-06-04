import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocieteRoutingModule } from './societe-routing.module';
import { SocieteComponent } from './societe.component';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { OverviewComponent } from './overview/overview.component';
import { CategorieComponent } from './categories/categorie/categorie.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { RolesComponent } from './role/roles/roles.component';
import { UtilisateursComponent } from './utilisateur/utilisateurs/utilisateurs.component';
import { RedirectComponent } from './utilisateur/redirect/redirect.component';
import { CreeUtilisateurComponent } from './utilisateur/cree-utilisateur/cree-utilisateur.component';
import { ConfirmdemandeComponent } from './utilisateur/confirmdemande/confirmdemande.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DemandesComponent } from './demande/demandes/demandes.component';
import { RedirectDemandesComponent } from './demande/redirect-demandes/redirect-demandes.component';
import { CreateDemandeComponent } from './demande/create-demande/create-demande.component';
import { SqueletteRolesComponent } from './role/squelette-roles/squelette-roles.component';
import { AddRolesComponent } from './role/add-roles/add-roles.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ChoisirCreationTypeComponent } from './utilisateur/choisir-creation-type/choisir-creation-type.component';
import { CreateNewUtilisateurComponent } from './utilisateur/create-new-utilisateur/create-new-utilisateur.component';
import { CreeCategorieComponent } from './categories/cree-categorie/cree-categorie.component';
import { RedirectCategorieComponent } from './categories/redirect-categorie/redirect-categorie.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarService } from './service/snackbar.service';
import { UpdateCategorieComponent } from './categories/update-categorie/update-categorie.component';
import { UpdateTicketComponent } from './categories/update-ticket/update-ticket.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { PrivateModule } from '../commercant/private.module';
import { DetailsUtilisateurComponent } from './utilisateur/details-utilisateur/details-utilisateur.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CoreModule } from '../core/core.module';
import { UpdateEmployementComponent } from './utilisateur/update-employement/update-employement.component';
import { ListpayementEmployeeComponent } from './utilisateur/listpayement-employee/listpayement-employee.component';


@NgModule({
  declarations: [
    SocieteComponent,
    OverviewComponent,
    CategorieComponent,
    RolesComponent,
    UtilisateursComponent,
    RedirectComponent,
    CreeUtilisateurComponent,
    ConfirmdemandeComponent,
    DemandesComponent,
    RedirectDemandesComponent,
    CreateDemandeComponent,
    SqueletteRolesComponent,
    AddRolesComponent,
    ChoisirCreationTypeComponent,
    CreateNewUtilisateurComponent,
    CreeCategorieComponent,
    RedirectCategorieComponent,
    UpdateCategorieComponent,
    UpdateTicketComponent,
    UpdateRoleComponent,
    DetailsUtilisateurComponent,
    UpdateEmployementComponent,
    ListpayementEmployeeComponent,
    
  ],
  imports: [
    CommonModule,
    SocieteRoutingModule,
    SharedModule,
    PrivateModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatStepperModule,
    CoreModule,
  ],
  providers:[SnackbarService]
})
export class SocieteModule { }
