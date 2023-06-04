import { ChangeDetectionStrategy, Component ,Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
@Input() name :any;
@Input() coins :any;
@Input() amount :any;
   
}
