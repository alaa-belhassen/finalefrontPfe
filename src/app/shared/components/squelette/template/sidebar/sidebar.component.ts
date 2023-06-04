import { ChangeDetectionStrategy, Component ,Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
 
  @Input() navbarlist :any=[];
  open=false;

  disconnect(){
    localStorage.clear()
  }
}
