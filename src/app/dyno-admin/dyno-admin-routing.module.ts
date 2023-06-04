import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynoAdminComponent } from './dyno-admin.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ClientsComponent } from './components/client/clients/clients.component';
import { TableComponent } from './components/client/table/table.component';
import { NewsocieteComponent } from './components/client/newsociete/newsociete.component';
import { DemandesComponent } from './components/demande/demandes/demandes.component';
import { ApearanceComponent } from '../shared/components/settings/apearance/apearance.component';
import { DetailsDemandesAdminComponent } from './components/demande/details-demandes-admin/details-demandes-admin.component';
import { DetailsTransactionComponent } from '../shared/components/details-transaction/details-transaction.component';
import { DetailDemandeCommercantComponent } from './components/demande/detail-demande-commercant/detail-demande-commercant.component';
import { TransactionhistoryComponent } from '../shared/components/transactionhistory/transactionhistory.component';


const routes: Routes = [{ path: '', component: DynoAdminComponent,children:[
  { path: '', component: OverviewComponent },
  {path:'transactionDetails/:id',component:DetailsTransactionComponent},
  {path:'Alltransaction',component:TransactionhistoryComponent},
  { path: 'overview', component: OverviewComponent },
  {path:'societedetails/:id',component:DetailsDemandesAdminComponent},
  {path:'Commercantdetails/:id',component:DetailDemandeCommercantComponent},

  { path: 'clients', component: ClientsComponent ,children:[
    {path:'', component:TableComponent},
    { path: 'newclientsociete', component: NewsocieteComponent },
    { path: 'newclientcomercant', component: NewsocieteComponent },
  ]},
  { path: 'settings', component: ApearanceComponent }
,
  { path: 'demandes', component: DemandesComponent },
]
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynoAdminRoutingModule { 
}
