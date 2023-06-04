import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { LoginService } from 'src/app/core/service/login.service';
import { ConvertDateService } from '../../services/convert-date.service';

@Component({
  selector: 'app-details-transaction',
  templateUrl: './details-transaction.component.html',
  styleUrls: ['./details-transaction.component.scss']
})
export class DetailsTransactionComponent implements OnInit{
signature :any;
tx :any;
users:any;
constructor(private list:LoginService,private route:ActivatedRoute,private service:LoginService,private conv:ConvertDateService){
  
 
}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.signature = params['id']
    });
    this.service.TransactionDetails(this.signature).subscribe(
      {
        next : (v)  => {
          this.tx = v ;
          console.log(this.tx)
          this.filterTransaction()

        },
        error : (e) => console.log(e)
      }
    );
  }
  filterTransaction(){
    console.log(this.tx.transaction.message.accountKeys) 
    var result = this.tx.transaction.message.accountKeys.filter((x:any)=> x!=="11111111111111111111111111111111" && x!=="ComputeBudget111111111111111111111111111111")
    console.log(result);
    this.list.getAccountName(result).subscribe(
      {
        next:(v)=> this.users = v ,
        error:(err) => console.log(err)
      }
    )
  }
  counter(i: number) {
    return new Array(i);
  }
  abs(i: any){
    return Math.abs(i);
  }
  lamport = LAMPORTS_PER_SOL
  convert(unix:any){
    return   this.conv.convert2(unix);
   }
}
