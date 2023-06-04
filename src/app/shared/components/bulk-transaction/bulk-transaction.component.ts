import { ChangeDetectionStrategy, Component, EventEmitter, Input } from '@angular/core';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { PhantomProviderService } from '../../services/phantom-provider.service';
import { ShareProviderService } from '../../services/share-provider.service';
import * as xlsx from 'xlsx'
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
const dropList= [
  {
    walletAddress: 'E4H41T3G2gubwFmDAiJxgPPWYEAghYD1C6a5i3LgeEMb',
    numLamports: 1* LAMPORTS_PER_SOL
  },
  {
    walletAddress: '14dnrdWuC1dhKX7V2jtx2j3BxfPZzoR5J3nF3FfmqDKt',
    numLamports: 1* LAMPORTS_PER_SOL
  },
  {
    walletAddress: '4d8gEohV2RwA4DJbpfTcEGqRd5h69r2H5Up6VdrRjCvz',
    numLamports: 1* LAMPORTS_PER_SOL
  },

] 
@Component({
  selector: 'app-bulk-transaction',
  templateUrl: './bulk-transaction.component.html',
  styleUrls: ['./bulk-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkTransactionComponent {
  constructor(private snackbar:SnackbarService,private transaction:PhantomProviderService,private shareData:ShareProviderService){
    this.shareData.data$.subscribe((res:any)=>{
      this.provider=res;
      console.log(res);
    })
  }
  provider:any;
  counte:any=1;
  data:any;
  async makeBulkTransaction(){
    if (!this.data){
      this.snackbar.openSnackBarErrorSimple("insert file ")
    }else{

    
    var sender = sessionStorage.getItem('wallet');
    if (sender ){
      var key = new PublicKey(sender);
      await this.transaction.AllTransactions(this.provider,key,this.data);
    }
  }
    }
  counter(i: number) {
      return new Array(i);
    }
    file:any;
    onchange($event:any){
      console.log($event);
      
        let fileReader = new FileReader();
        this.file = $event.target.files[0];
        fileReader.readAsArrayBuffer(this.file);
      console.log(this.data);
      
        fileReader.onload = (e) => {
          var workBook = xlsx.read(fileReader.result,{type:'binary'});
          var sheetNames = workBook.SheetNames;
          this.data = xlsx.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
          console.log(this.data);
        }
        
        
    }
}
