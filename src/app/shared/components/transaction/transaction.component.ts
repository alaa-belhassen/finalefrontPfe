import { ChangeDetectionStrategy, Component, EventEmitter, Input } from '@angular/core';
import { PhantomProviderService } from '../../services/phantom-provider.service';
import { ShareProviderService } from '../../services/share-provider.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  provider:any;
  constructor(private transaction:PhantomProviderService,private shareData:ShareProviderService){
    this.shareData.data$.subscribe((res:any)=>{
      this.provider=res;
      console.log(res);
    })
  }
  async makeTransaction(receiver:any,amount:any){
    var sender = sessionStorage.getItem('wallet');
    if (sender ){
      console.log(this.provider)
      await this.transaction.transaction(sender,receiver,this.provider,amount);
    }
    }
    async airdrop(receiver:any,amount:any){
      await this.transaction.airdrop(receiver,this.provider,amount);
      
    }
}
