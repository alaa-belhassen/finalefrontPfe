import {  ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { PhantomProviderService } from '../../services/phantom-provider.service';
import { ShareProviderService } from '../../services/share-provider.service';
import { PublicKeyService } from 'src/app/dyno-admin/services/public-key.service';
import { LoginService } from 'src/app/core/service/login.service';

@Component({
  selector: 'app-connect-disconnect-provider',
  templateUrl: './connect-disconnect-provider.component.html',
  styleUrls: ['./connect-disconnect-provider.component.scss'],
})
export class ConnectDisconnectProviderComponent  {

  provider:any;
  @Output() isConnected= new EventEmitter<boolean>();
  connected:any;
  publicKey:any="";
  toggle:boolean=false;
  users:any;
constructor(private list:LoginService,private pubKeyService:PublicKeyService ,private PhantomProviderService:PhantomProviderService,private shareData:ShareProviderService,private change:ChangeDetectorRef){
  this.shareData.connected$.subscribe((res:boolean)=>this.connected=res);
}

ngOnInit(): void {
  console.log(this.users);
  
}

getprovider(){
  this.provider =  this.PhantomProviderService.getPhantomProvider();
  console.log(this.provider)
  this.shareData.setMessage(this.provider);
}
async connect(){
  this.getprovider();
  let res = await this.PhantomProviderService.connect(this.provider)
  if ( res == true){
    this.publicKey=sessionStorage.getItem('wallet');
    this.list.getAccountName([this.publicKey]).subscribe(
      {
        next:(v)=> {
          this.users = v  
          console.log(v)
        },
        error:(err) => console.log(err),
        complete:() =>     this.change.detectChanges()

      }
    )
    this.pubKeyService.setPublicKey(this.publicKey);
    this.shareData.setConnection(true);
    this.change.detectChanges(); 

  }
 
}

async disconnect(){
    this.PhantomProviderService.disconnect(this.provider);
    this.shareData.setMessage("initialProvider");
    this.pubKeyService.setPublicKey(null);
    this.shareData.setConnection(false);
    this.toggle=false;

}

getPubKey(){
  if (sessionStorage.getItem('wallet') !== null){
    this.publicKey=sessionStorage.getItem('wallet')?.toString();
    this.connected = true;
  }
}

}
