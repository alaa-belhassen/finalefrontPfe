import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
const connection = new Connection(clusterApiUrl("devnet"));

@Injectable({
  providedIn: 'root'
})
export class PhantomProviderService {

  constructor(private http:HttpClient) { }

  getPhantomProvider() {
    if ("solana" in window) {
      const provider = (window as any).solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
    window.open("https://phantom.app/", "_blank");
  }

 async connect(provider:any){
    try {
      if(!provider.isConnected){
       var  res = await  provider.connect();
       sessionStorage.setItem('wallet',res.publicKey.toString())  
       return true
      }
    } catch (err) {
      console.log(err)
      return false
    }
    return true 
  }
  
  async disconnect(provider:any){
    try{
      sessionStorage.removeItem('wallet')
      if (provider.isConnected)
        await provider.disconnect()

    }catch(err){
      console.log(err)
    }
    
  }

  async getAccountBalance(publickey:any){
    if ( publickey=="" ) {
      console.warn("public key misssing connect first ")
      return;
    }
    var key = new PublicKey(publickey)
    return await connection.getBalance(key)/ LAMPORTS_PER_SOL;
  }

  async getRentExeptionValue(publickey:any){
    if ( publickey=="" ) {
      console.warn("public key misssing connect first ")
      return;
    }

    var key = new PublicKey(publickey)
   /* var info =  await connection.getAccountInfo(key);

    if ( !info ){
      console.warn("public Key invalid ")
      return; 
    }*/
     
    return await connection.getMinimumBalanceForRentExemption(0);
    

  }

  async transaction(publickey:any,receiver:string,provider:any,amount:number){
    if ( publickey=="" || provider=="" || receiver == "") {
      console.warn("provider information or connect to a wallet ")
      return;
    }
    const receiverpubkey= new PublicKey(receiver);
    const payerpubkey= new PublicKey(publickey);
    const  recentBlockhash = await connection.getLatestBlockhash();
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payerpubkey ,
        toPubkey: receiverpubkey  ,
        lamports: amount*10000,
      })
    );

    if(transaction) {
      console.log("Txn created successfully");
    }
    
    transaction.recentBlockhash=  recentBlockhash.blockhash ;
    transaction.feePayer = payerpubkey ;


    let signed = await provider.signTransaction(transaction);
    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
  
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction(
      {
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      }
    );
    
    return signature;
   }

   async airdrop(receiver:string,provider:any,amount:any){
    if ( provider=="" || receiver == "") {
      console.warn("provider information or connect to a wallet ")
      return;
    }
    const receiverpubkey= new PublicKey(receiver);
    let airdropSignature = await connection.requestAirdrop(
      receiverpubkey,
      amount*LAMPORTS_PER_SOL,
    );
    if(airdropSignature) {
      console.log("Txn created successfully");
    }
    let signed = await provider.signTransaction(airdropSignature);
    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction(
      {
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      }
    );
    
   }

  
   generateTransactions2( dropList: any, fromWallet: PublicKey):Transaction[] {
    let result: Transaction[] = [];
    let txInstructions: TransactionInstruction[] = dropList.map((drop:any) => {return SystemProgram.transfer({
        fromPubkey: fromWallet,
        toPubkey: new PublicKey(drop.walletAddress),
        lamports: drop.numLamports
    })})
  
    for (let i = 0; i < txInstructions.length ; i++){
        let bulkTransaction = new Transaction();
        
        if (txInstructions[i]) bulkTransaction.add(txInstructions[i]);  
        
        result.push(bulkTransaction);
    }
    return result;
  };
  generateTransactions(batchSize:number, dropList: any, fromWallet: PublicKey):Transaction[] {
    let result: Transaction[] = [];
    let txInstructions: TransactionInstruction[] = dropList.map((drop:any) => {return SystemProgram.transfer({
        fromPubkey: fromWallet,
        toPubkey: new PublicKey(drop.walletAddress),
        lamports: drop.numLamports
    })})
    const numTransactions = Math.ceil(txInstructions.length / batchSize);
    for (let i = 0; i < numTransactions; i++){
        let bulkTransaction = new Transaction();
        let lowerIndex = i * batchSize;
        let upperIndex = (i+1) * batchSize;
        for (let j = lowerIndex; j < upperIndex; j++){
            if (txInstructions[j]) bulkTransaction.add(txInstructions[j]);  
        }
        result.push(bulkTransaction);
    }
    return result;
  };
  
  async executeTransactions(provider:any,pubkey:any, transactionList: Transaction[]):Promise<PromiseSettledResult<string>[]> {
    let result:PromiseSettledResult<string>[] = [];
    let staggeredTransactions:Promise<string>[] = transactionList.map((transaction, i, allTx) => {
        return (new Promise(() => {
                    connection.getLatestBlockhash()
                    .then(recentHash=>transaction.recentBlockhash = recentHash.blockhash)
                    .then(transaction.feePayer = pubkey)
                    .then(async ()=>{ 
                       var signed = await provider.signTransaction(transaction);
                       await connection.sendRawTransaction(signed.serialize());
                    })
            
         })
    )})
  
    result = await Promise.allSettled(staggeredTransactions);
    return result;
  }
  
   async AllTransactions(provider:any,publickey:any,dropList:any){
    const transactionList = this.generateTransactions(4,dropList,publickey);
    const txResults = await this.executeTransactions(provider,publickey,transactionList);
    console.log(txResults);
   }
  
}
