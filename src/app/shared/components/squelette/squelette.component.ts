import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DarkmodeService } from 'src/app/dyno-admin/services/darkmode.service';

@Component({
  selector: 'app-squelette',
  templateUrl: './squelette.component.html',
  styleUrls: ['./squelette.component.scss'],
})
export class SqueletteComponent implements OnInit{
  constructor(private service: DarkmodeService){
    this.service.data$.subscribe((res)=>this.dark=res)
  }
  ngOnInit(): void {
    this.dark = sessionStorage.getItem('dark') == 'true' ;
  }
  open=false;
  dark=false;
  @Input() navlist :any =[];
}
