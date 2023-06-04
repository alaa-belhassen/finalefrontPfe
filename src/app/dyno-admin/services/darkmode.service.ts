import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  private subject = new BehaviorSubject<any>('initialProvider');
  public data$ = this.subject.asObservable();
  setMessage(data:any){
    this.subject.next(data);
  }
  setConnection(data:any){
    this.subject.next(data);
  }
}
