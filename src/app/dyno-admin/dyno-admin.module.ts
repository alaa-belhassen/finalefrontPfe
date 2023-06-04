import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynoAdminRoutingModule } from './dyno-admin-routing.module';
import { DynoAdminComponent } from './dyno-admin.component';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import {MatBadgeModule} from '@angular/material/badge';
import { OverviewComponent } from './components/overview/overview.component';
import { ClientsComponent } from './components/client/clients/clients.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableComponent } from './components/client/table/table.component';
import { NewsocieteComponent } from './components/client/newsociete/newsociete.component';
import { DemandesComponent } from './components/demande/demandes/demandes.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableDemandeComponent } from './components/demande/table-demande/table-demande.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableFilterModule } from 'mat-table-filter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SnackbarService } from '../societe/service/snackbar.service';
import { DetailsDemandesAdminComponent } from './components/demande/details-demandes-admin/details-demandes-admin.component';
import { DetailDemandeCommercantComponent } from './components/demande/detail-demande-commercant/detail-demande-commercant.component';
import { CoreModule } from '../core/core.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    DynoAdminComponent,
    OverviewComponent,
    ClientsComponent,
    TableComponent,
    NewsocieteComponent,
    DemandesComponent,
    TableDemandeComponent,
    DetailsDemandesAdminComponent,
    DetailDemandeCommercantComponent,
  ],
  imports: [
    CommonModule,
    DynoAdminRoutingModule,
    MatIconModule,
    SharedModule,
    NgxChartsModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
     ReactiveFormsModule,
     MatDialogModule,
     MatSnackBarModule,
     MatTableFilterModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatStepperModule,
     CoreModule,
     MatTooltipModule,
     ClipboardModule
     
  ],
  exports:[
    
  ],
  providers: [  
    MatDatepickerModule,SnackbarService  
  ],
})
export class DynoAdminModule { }
