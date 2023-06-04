import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  private subject = new BehaviorSubject<any>('initialProvider');
  public data$ = this.subject.asObservable();
  private subject2 = new BehaviorSubject<any>(false);
  public data2$ = this.subject2.asObservable();
  setMessage(data:any){
    this.subject.next(data);
  }
  setConnection(data:any){
    this.subject.next(data);
  }
  setspin(data:any){
    this.subject2.next(data);
  }
}
