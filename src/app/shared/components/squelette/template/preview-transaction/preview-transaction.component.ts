import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
@Component({
  selector: 'app-preview-transaction',
  templateUrl: './preview-transaction.component.html',
  styleUrls: ['./preview-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTransactionComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.transaction);
    
  }
  constructor(private router:Router){

  }
  @Input() user :any;
  @Input() transaction :any;
  @Input() date :any;
  
  lamport = LAMPORTS_PER_SOL
  redirect(){
    if(this.user == "superuser"){
      this.router.navigate(['/dynoAdmin/transactionDetails/', this.transaction.transaction.signatures[0]]);

    }else if (this.user == "societe"){
      this.router.navigate(['/societe/transactionDetails/', this.transaction.transaction.signatures[0]]);

    }else if (this.user == "commercant"){
      this.router.navigate(['/commercant/transactionDetails/', this.transaction.transaction.signatures[0]]);
    }

  }
}
