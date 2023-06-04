import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Subject, of, takeUntil, tap } from 'rxjs';
import { fadeinout } from 'src/app/core/service/animation.service';
import { LoginService } from 'src/app/core/service/login.service';
import { PublicKeyService } from 'src/app/dyno-admin/services/public-key.service';
import { ConvertDateService } from 'src/app/shared/services/convert-date.service';
const connection = new Connection(clusterApiUrl("devnet"));

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations:[fadeinout]
})



export class OverviewComponent   implements OnInit,AfterViewInit{
  saleData :any=[]
  cards:any =[]
  envoiTokensByMonth:any=[]
  envoiTokensByYear:any=[]
  sommebymonth = new Array(12).fill(0);
  sommebyyear:number=0;
  toggle=false;
  ngOnInit() {
    this.pubKeyListener.data$.subscribe(async (res)=> {
      this.publickey = res;
      if (res != null){
        await this.getTransactionsAll(res);
        this.cleanData();

       
        this.saleData = [
          { name: "TokenReceived", value: this.sommereceiver },
          { name: "TokenSended", value: this.sommesender },
         
        ];
       
        this.Transactions$ = this.getTransactions(res,3);
        this.balance$ = this.getBalance(res);
        this.refreshdata();
        this.cards = [
          {name:"Jeton utiliser",info1:"",info2:this.sommesender},
          {name:"balance",info1:"",info2:this.balance?.lamports},
          {name:"Remboursés",info1:"5",info2:"850"}
      
        ]
        this.getmonth()
        this.getyear()
        console.log(this.sommebymonth);
        
        this.envoiTokensByMonth = [
          { name: "	Janvier", value: this.sommebymonth[0] },
          { name: "Février", value: this.sommebymonth[1]  },
          { name: "Mars", value: this.sommebymonth[2] },
          { name: "Avril", value: this.sommebymonth[3]  },
          { name: "Mai", value: this.sommebymonth[4] },
          { name: "Juin", value: this.sommebymonth[5]  },
          { name: "Juillet", value: this.sommebymonth[6]  },
          { name: "Aout", value: this.sommebymonth[7]  },
          { name: "Septembre", value: this.sommebymonth[8]  },
          { name: "Octobre", value:this.sommebymonth[9] },
          { name: "Novembre", value: this.sommebymonth[10]  },
          { name: "Décembre", value: this.sommebymonth[11]  },
        ];
        console.log(this.sommebyyear)
        this.envoiTokensByYear = [
          { name: "2023", value: this.sommebyyear },
        ]
        this.barChartcustomColors = 
        [
          { name: "2023", value: 'rgb(15 118 110)' },
        ]
      }
    }); 
  }
     
  barChartcustomColors:any;
  private destroy$ = new Subject<void>();
  balance$:any;
  balance:any;
  publickey:any=null;
  Transactions:any;
  AllTransactions:any;
  Transactions$:any;
  lamport = LAMPORTS_PER_SOL;
  received:any=[]
  sended:any=[]
  sommesender=0;
  sommereceiver=0;

  constructor(private conv:ConvertDateService,private service:LoginService,private pubKeyListener:PublicKeyService){

    
  }

ngAfterViewInit(): void {
 
}

  convert(unix:any){
   return   this.conv.convert2(unix);
  }
  getmonth(){
    
    this.AllTransactions.map( (x:any) => {
      if( x.transaction.message.accountKeys[0].toBase58() == this.publickey){
        console.log
        var i:number =this.conv.getmonth(x.blockTime);
        this.sommebymonth[i] += this.calculTokensSended(x);
        console.log(this.calculTokensSended(x))
      }
      
    } )
    
    
  }

  getyear(){
    this.AllTransactions.map( (x:any) => {
      if( x.transaction.message.accountKeys[0].toBase58() == this.publickey){
        var i:number =this.conv.getYear(x.blockTime);
        if( i == 2023 ){
          this.sommebyyear += this.calculTokensSended(x);
        }
      }      
    } )
  }

  getBalance(res:any){
    return this.service.balance(res);
  }

  getTransactions(publickey:any,numTx:number){
    return this.service.historique(publickey,numTx);
  }

  async getTransactionsAll(address: string) {
    const pubKey = new PublicKey(address);
    this.AllTransactions = [];
    let transactionList = await connection.getSignaturesForAddress(pubKey);
    let transactions = await Promise.all(transactionList.map(async element => {
      let tx = await connection.getTransaction(element.signature, { maxSupportedTransactionVersion: 0 });
      return tx;
    }));
    this.AllTransactions = transactions;
  }
  
  cleanData(){
    this.sommesender=0;
    this.sommereceiver=0;
    console.log(this.AllTransactions)
   this.AllTransactions.map((v:any) => {
    if( v.transaction.message.accountKeys[0].toBase58() == this.publickey){
      this.sended.push(v)
      this.sommesender += this.calculTokensSended(v)
    }else{
      this.received.push(v)
      this.sommereceiver += this.calculTokensReceived(v)
    }
   })
  }

calculTokens(tx:any){
 var somme :number=0;

  for (var i = 0; i < tx.transaction.message.accountKeys.length-2; i++) {
    somme += this.abs((parseFloat(tx.meta.preBalances[i+1])-parseFloat(tx.meta.postBalances[i+1]))/10000)
 }
 return somme ;
}
calculTokensReceived(tx: any) {
  var somme: number = 0;
  for (var i = 0; i < tx.transaction.message.accountKeys.length - 2; i++) {
    if (tx.transaction.message.accountKeys[i + 1].toBase58() == this.publickey) {
      somme += this.abs((parseFloat(tx.meta.postBalances[i +1 ]) - parseFloat(tx.meta.preBalances[i + 1]))/10000 );
    }
  }
  return somme;
}

calculTokensSended(tx: any) {
  var somme: number = 0;
  for (var i = 0; i < tx.transaction.message.accountKeys.length - 2; i++) {
    if (tx.transaction.message.accountKeys[i].toBase58() == this.publickey) {
      somme += this.abs((parseFloat(tx.meta.preBalances[i])-parseFloat(tx.meta.postBalances[i]))/10000)
    }
  }
  return somme;
}


  counter(i: number) {
    return new Array(i);
  }
  abs(i: any){
    return Math.abs(i);
  }

  refreshdata(){
    this.Transactions$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        this.Transactions = data
        console.log(data)
      })
    ).subscribe();

    this.balance$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        this.balance = data
        console.log(data)
      })
    ).subscribe();
  }
  }
  
