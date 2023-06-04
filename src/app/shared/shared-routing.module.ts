import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './components/balance/balance.component';
import { ConnectDisconnectProviderComponent } from './components/connect-disconnect-provider/connect-disconnect-provider.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionhistoryComponent } from './components/transactionhistory/transactionhistory.component';
import { SharedComponent } from './shared.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [{ path: '', component: SharedComponent },
{ path: 'connect', component: ConnectDisconnectProviderComponent },
{ path: 'balance', component: BalanceComponent },
{ path: 'historique', component: TransactionhistoryComponent },
{ path: 'transaction', component: TransactionComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{path:'home',component:HomepageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
