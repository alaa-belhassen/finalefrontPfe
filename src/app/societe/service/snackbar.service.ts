import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedComponent } from 'src/app/shared/components/snackbars/added/deleted.component';
import { CreationErorsimpleComponent } from 'src/app/shared/components/snackbars/creation-erorsimple/creation-erorsimple.component';
import { CreationErrorComponent } from 'src/app/shared/components/snackbars/creation-error/creation-error.component';
import { InProgressComponent } from 'src/app/shared/components/snackbars/in-progress/in-progress.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar,
    ) { }
  openSnackBarSuccess() {
    this.snackBar.openFromComponent(DeletedComponent, {
      duration: 2000,
      panelClass: 'notif-success'
    });
  }

  openSnackBarinProgress() {
    this.snackBar.openFromComponent(InProgressComponent, {
      duration: 2000,
      panelClass: 'notif-progress'
    });
  }
  openSnackBarError(err: any) {
    this.snackBar.openFromComponent(CreationErrorComponent, {
      duration: 2000,
      data: { error: err },
      panelClass: 'notif-eror'
    });
  }
  openSnackBarErrorSimple(err: any) {
    this.snackBar.openFromComponent(CreationErorsimpleComponent, {
      duration: 2000,
      data: { error: err },
      panelClass: 'notif-eror'
    });
  }
}
