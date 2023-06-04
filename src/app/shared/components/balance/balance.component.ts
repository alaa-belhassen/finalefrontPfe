import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {  clusterApiUrl, Connection, LAMPORTS_PER_SOL,PublicKey } from '@solana/web3.js';
import { PhantomProviderService } from '../../services/phantom-provider.service';
import { SharedComponent } from '../../shared.component';
import { ShareProviderService } from '../../services/share-provider.service';


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
constructor(private PhantomProviderService:PhantomProviderService,private shareData:ShareProviderService){
 this.getbalance();
}
balance:any;
getbalance(){
  var key = sessionStorage.getItem('wallet');
  this.balance = this.PhantomProviderService.getAccountBalance(key);
}


}
