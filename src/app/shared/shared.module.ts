import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ConnectDisconnectProviderComponent } from './components/connect-disconnect-provider/connect-disconnect-provider.component';
import { PubKeyFormatPipe } from './pipes/pub-key-format.pipe';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { BalanceComponent } from './components/balance/balance.component';
import {MatDividerModule} from '@angular/material/divider';
import { TransactionhistoryComponent } from './components/transactionhistory/transactionhistory.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { BulkTransactionComponent } from './components/bulk-transaction/bulk-transaction.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CardComponent } from './components/card/card.component';
import { Notfound404Component } from './components/notfound404/notfound404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { DeletedComponent } from './components/snackbars/added/deleted.component';
import { CreationErrorComponent } from './components/snackbars/creation-error/creation-error.component';
import { SqueletteComponent } from './components/squelette/squelette.component';
import {SidebarComponent} from './components/squelette/template/sidebar/sidebar.component'
import {NavbarComponent} from './components/squelette/template/navbar/navbar.component'
import {GreatingComponent} from './components/squelette/template/greating/greating.component'
import {PreviewTransactionComponent} from './components/squelette/template/preview-transaction/preview-transaction.component'
import { SettingstemplateComponent } from './components/settings/settingstemplate/settingstemplate.component';
import { AccountComponent } from './components/settings/account/account.component';
import { LangueComponent } from './components/settings/langue/langue.component';
import { ApearanceComponent } from './components/settings/apearance/apearance.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreationErorsimpleComponent } from './components/snackbars/creation-erorsimple/creation-erorsimple.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DetailsTransactionComponent } from './components/details-transaction/details-transaction.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { BlockuserComponent } from './components/dialog/blockuser/blockuser.component';
import { SnackbarService } from '../societe/service/snackbar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InProgressComponent } from './components/snackbars/in-progress/in-progress.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CoreModule } from '../core/core.module';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

@NgModule({
  declarations: [
    SharedComponent,
    ConnectDisconnectProviderComponent,
    PubKeyFormatPipe,
    BalanceComponent,
    TransactionhistoryComponent,
    TransactionComponent,
    BulkTransactionComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    Notfound404Component,
    DeleteDialogComponent,
    DeletedComponent,
    CreationErrorComponent,
    SqueletteComponent,
    SidebarComponent,
    NavbarComponent,
    GreatingComponent,
    PreviewTransactionComponent,
    SettingstemplateComponent,
    AccountComponent,
    LangueComponent,
    ApearanceComponent,
    HomepageComponent,
    CreationErorsimpleComponent,
    DropdownComponent,
    DetailsTransactionComponent,
    BlockuserComponent,
    InProgressComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ClipboardModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    CoreModule
  ],
  providers:[SnackbarService],
  exports: [
    ConnectDisconnectProviderComponent,
    TransactionComponent,
    BulkTransactionComponent,
    BalanceComponent,
    TransactionhistoryComponent,
    CardComponent,
    Notfound404Component,
    PubKeyFormatPipe,
    SqueletteComponent,
    PreviewTransactionComponent,
    SettingstemplateComponent,
    AccountComponent,
    LangueComponent,
    ApearanceComponent,
    DropdownComponent
  ]

})
export class SharedModule { }
