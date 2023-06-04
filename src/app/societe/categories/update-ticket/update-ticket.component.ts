import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../../_http/list.service';
import { UpdateService } from '../../_http/update.service';
import { SnackbarService } from '../../service/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent implements OnInit {
  constructor(private fb:FormBuilder,private listservice:ListService ,private update:UpdateService,private snackbar:SnackbarService,
    public dialogRef: MatDialogRef<UpdateTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    ticketForm! :FormGroup ;

    ngOnInit(): void {
      console.log(this.data)
      this.ticketForm = this.fb.group(
        {
          prixTicket : this.fb.control("",Validators.required),
          nameTicket : this.fb.control("",Validators.required),
        }
      )
    }
    inputs =  [
      {label:"nameTicket",name:"NomTicket"},
      {label:"prixTicket",name:"prixTicket"}

    ];
    onNoClick(): void {
      this.dialogRef.close();
    }

    

    onYesClick(): void {
      if ( !this.ticketForm.invalid){
      this.update.updateTicket(this.data.id,this.data.idEmployer,this.ticketForm.value).subscribe(
        {
          next: (v) => console.log(v),
          error: (e) => {
            console.log(e);
            this.snackbar.openSnackBarErrorSimple("failed to update")
          },
          complete:()=>{
            this.snackbar.openSnackBarSuccess()
          }
      }
    )
    this.dialogRef.close(this.data);
  }
      
    }
}
