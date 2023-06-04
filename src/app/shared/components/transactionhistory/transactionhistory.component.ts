import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { ConvertDateService } from '../../services/convert-date.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import jwt_decode from 'jwt-decode';
const connection = new Connection(clusterApiUrl("devnet"));
@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.scss'],

})
export class TransactionhistoryComponent implements OnInit,AfterViewInit{
  constructor(private conv:ConvertDateService,private router:Router,private service:LoginService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    
    var publickey=sessionStorage.getItem('wallet')
    var token=localStorage.getItem('Token')
    if(token){
      var decodedToken:any = jwt_decode(token); 
      console.log(decodedToken)
      this.user = decodedToken.role;
    }
  
    if (publickey){
      await this.getTransactions(publickey,100);
      console.log(this.Transactions)
      this.dataSource.data =this.Transactions;
      this.dataSource.paginator = this.paginator;

    }
     
  }
  user:any;
  Transactions:any=[];
  lamport = LAMPORTS_PER_SOL;
  dataSource: MatTableDataSource<any> = new MatTableDataSource() ;
  displayedColumns=['signature', 'Block', 'Instructions','Time','By','fees'];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  convert(unix:any){
   return   this.conv.convert2(unix);
  }
  redirect(signature:any){
    this.router.navigate(['/societe/transactionDetails/',signature]);
  
      if(this.user == "superuser"){
        this.router.navigate(['/dynoAdmin/transactionDetails/', signature]);
  
      }else if (this.user == "employer"){
        this.router.navigate(['/societe/transactionDetails/', signature]);
  
      }else if (this.user == "shopowner"){
        this.router.navigate(['/commercant/transactionDetails/', signature]);
      }
  
    
  }


  async getTransactions(address: string, numTx: any) {
    const pubKey = new PublicKey(address);
    this.Transactions = [];
    let transactionList = await connection.getSignaturesForAddress(pubKey);
    let transactions = await Promise.all(transactionList.map(async element => {
      let tx = await connection.getTransaction(element.signature, { maxSupportedTransactionVersion: 0 });
      return tx;
    }));
    this.Transactions = transactions;
  }
  
  

 
  


  counter(i: number) {
    return new Array(i);
  }
  abs(i: any){
    return Math.abs(i);
  }
}
