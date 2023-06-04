import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './Commercant-routing.module';
import { PrivateComponent } from './Commercant.component';
import { SharedModule } from '../shared/shared.module';
import { SolanaComponent } from './components/solana/solana.component';
import { DynoAdminModule } from '../dyno-admin/dyno-admin.module';
import { OverviewComponent } from './components/overview/overview.component';
import { DemandeComponent } from './components/demandes/demande/demande.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDemandeCommercantComponent } from './components/demandes/add-demande-commercant/add-demande-commercant.component';
import { RedirectdemandeCommercantComponent } from './components/demandes/redirectdemande-commercant/redirectdemande-commercant.component';
import { DetailsDemandeAccepterComponent } from './components/demandes/details-demande-accepter/details-demande-accepter.component';
@NgModule({
  declarations: [
    PrivateComponent,
    SolanaComponent,
    OverviewComponent,
    DemandeComponent,
    AddDemandeCommercantComponent,
    RedirectdemandeCommercantComponent,
    DetailsDemandeAccepterComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    DynoAdminModule,
    NgxChartsModule,
    MatIconModule,
    CoreModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule
    ]
  ,exports:[
    SolanaComponent
  ]
  
})
export class PrivateModule { }
