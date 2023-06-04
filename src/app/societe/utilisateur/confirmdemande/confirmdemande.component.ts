import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdemande',
  templateUrl: './confirmdemande.component.html',
  styleUrls: ['./confirmdemande.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmdemandeComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmdemandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onYesClick(): void {
    this.dialogRef.close(this.data);
  }
  
}
