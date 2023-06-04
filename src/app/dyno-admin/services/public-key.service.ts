import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicKeyService {

  private subject = new BehaviorSubject<any>(null);
  public data$ = this.subject.asObservable();
  private subject2 = new BehaviorSubject<any>(null);
  public data2$ = this.subject.asObservable();
  setPublicKey(data:any){
    this.subject.next(data);
  }
  verif(data:any){
    this.subject2.next(data);
  }
  
}
