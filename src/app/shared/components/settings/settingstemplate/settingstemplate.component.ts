import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settingstemplate',
  templateUrl: './settingstemplate.component.html',
  styleUrls: ['./settingstemplate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingstemplateComponent {
  navs:any[]=[
    {name:"General",route:'account'},
    {name:"apearance",route:'apearance'},
    {name:"languague",route:'langue'},

  ]
}
