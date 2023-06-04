import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fadeinout } from 'src/app/core/service/animation.service';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations:[fadeinout]
})
export class DropdownComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.list)

  }
  @Input() list: any;
  @Output() result = new EventEmitter<string>();
  drop=false;
  selected:any;
  getFromlist(i:any){
    this.result.emit(i);
    this.drop = !this.drop
    this.selected = i;
  }
}
