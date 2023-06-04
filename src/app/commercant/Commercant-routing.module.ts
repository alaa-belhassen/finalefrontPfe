import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolanaComponent } from './components/solana/solana.component';
import { PrivateComponent } from './Commercant.component';
import { OverviewComponent } from './components/overview/overview.component';
import { DemandeComponent } from './components/demandes/demande/demande.component';
import { RedirectdemandeCommercantComponent } from './components/demandes/redirectdemande-commercant/redirectdemande-commercant.component';
import { AddDemandeCommercantComponent } from './components/demandes/add-demande-commercant/add-demande-commercant.component';
import { DetailsDemandeAccepterComponent } from './components/demandes/details-demande-accepter/details-demande-accepter.component';
import { ApearanceComponent } from '../shared/components/settings/apearance/apearance.component';
import { DetailsTransactionComponent } from '../shared/components/details-transaction/details-transaction.component';
import { TransactionhistoryComponent } from '../shared/components/transactionhistory/transactionhistory.component';

const routes: Routes = [{ path: '', component: PrivateComponent ,children:[
    { path: '', component: OverviewComponent},
    { path: 'solana', component: SolanaComponent},
    { path: 'overview', component: OverviewComponent},
    {path:'transactionDetails/:id',component:DetailsTransactionComponent},
    {path:'Alltransaction',component:TransactionhistoryComponent},

    { path: 'demande', component: RedirectdemandeCommercantComponent,children:[

    { path: '', component: DemandeComponent},
    { path: 'créeDemandeCommercant', component: AddDemandeCommercantComponent},
    { path: 'detailsDemandeAccepter/:id', component: DetailsDemandeAccepterComponent},
    ]},
    { path: 'settings', component: ApearanceComponent }


  
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
