import { Component, OnInit } from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';
import { ShareProviderService } from 'src/app/shared/services/share-provider.service';

@Component({
  selector: 'app-solana',
  templateUrl: './solana.component.html',
  styleUrls: ['./solana.component.scss']
})
export class SolanaComponent implements OnInit {
  isConnected:any;
  constructor(private sharedData:ShareProviderService){
    this.sharedData.connected$.subscribe((res:any)=>{
      console.log(res);
      this.isConnected=res;
     
    }
    )
  }
  ngOnInit(): void {
    
  }

}
