import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareProviderService {
  private subjectProvider = new BehaviorSubject<any>('initialProvider');
  public data$ = this.subjectProvider.asObservable();
  private subjectConnection = new BehaviorSubject<boolean>(false);
  public connected$ = this.subjectConnection.asObservable();
  setMessage(data:any){
    this.subjectProvider.next(data);
  }
  setConnection(data:any){
    this.subjectConnection.next(data);
  }

}
