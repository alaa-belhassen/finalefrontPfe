import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertDateService {

  constructor() { }
  convert23(unix:any){
    let start = new Date().getTime();
    let end =  new Date(unix*1000).getTime();
    let time  =   end - start ;
    let diffDay = Math.floor( time/86400000);
    let diffHour = Math.floor((time%86400000)/3600000);
    let diffMinute = Math.floor(((time%86400000)%3600000)/60000);
    if (diffDay>=1){
      return diffDay
    }else if (diffDay == 0 && diffHour>=1) {
      return diffHour
    }else {
      return diffMinute
    }
  }
  
 convert2(unix:any) {
    let start = new Date().getTime();
    let end =  new Date(unix*1000).getTime();
    let time = start - end;
    let diffDay = Math.floor(time / 86400000);
    let diffHour = Math.floor((time % 86400000) / 3600000);
    let diffMinute = Math.floor(((time % 86400000) % 3600000) / 60000);
  
    if (diffDay >= 1) {
      return diffDay + " Jours ";
    } else if (diffHour >= 1) {
      return diffHour+" Heures "+ diffMinute+ " minutes ";
    } else {
      return diffMinute + " minutes ";
    }
  }
 getmonth(unix:any){
  const date = new Date(unix * 1000);
  const currentMonth = date.getMonth();
  return currentMonth;
 }
 getYear(unix:any){
  const date = new Date(unix * 1000);
  const currentMonth = date.getFullYear();
  return currentMonth
 }

}
