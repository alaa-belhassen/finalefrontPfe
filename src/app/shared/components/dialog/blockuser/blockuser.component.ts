import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-blockuser',
  templateUrl: './blockuser.component.html',
  styleUrls: ['./blockuser.component.scss']
})
export class BlockuserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
 
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onYesClick(): void {
    this.dialogRef.close("delete");
  }
}
