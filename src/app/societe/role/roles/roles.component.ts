import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, filter, of, takeUntil, tap } from 'rxjs';
import { ListService } from '../../_http/list.service';
import { DeleteService } from '../../_http/delete.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/components/dialog/delete-dialog/delete-dialog.component';
import { UpdateRoleComponent } from '../update-role/update-role.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent implements OnInit,OnDestroy {
  constructor(public dialog: MatDialog,private router: Router, private route: ActivatedRoute , private service:ListService , private _delete:DeleteService ){
  }
  ngOnInit(): void {
    var token = localStorage.getItem("Token");
    
    if(token){
      var decodedToken:any = jwt_decode(token); 
      
      this.Id = decodedToken.Id;
    }

    this.getRoles(this.Id) 
    this.dataSource$ = this.Roles$;
    this.displayedColumns=[ 'name', 'actions'];
    this.refreshdata();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  Id:any
  private destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'name', 'weight', 'actions'];
  Roles$:any;
  dataSource$: Observable<any> = of([]);  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

 redirect(){
    this.router.navigate(['creeRoles'],{relativeTo:this.route})
 }
  
  getRoles(id:any){
    this.Roles$ = this.service.getRoles(id);
  }

  openDialog(name:any): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data:{name:name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result)
        this.delete(name)
      
    });
  }

  openDialogupdateRole(role:any): void {
    let dialogRef = this.dialog.open(UpdateRoleComponent, {
      data:{name:role.name,id:this.Id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed',result);
      if(result){
        this.refreshdata();
      }
    });
  }
 

  /*updateRole(){

    //const myCheckboxValues = Object.assign(new addRoleDto(), this.RoleForm.value);
   if(!this.RoleForm.invalid)
      {
          console.log('ok');
          this.addRole.roleName= this.RoleForm.value.nomRole;
          const checkedCheckboxes = Object.keys(this.RoleForm.value).filter(key => this.RoleForm.value[key] === true);
          this.addRole.Permission = checkedCheckboxes ;
          console.log(this.addRole);
          
          this.service.addRole(this.addRole).subscribe({
            next: (v) => console.log(v),
            error: (e) => { this.snackBar.openSnackBarError(this.RoleForm.invalid)
             console.error(e)},
            complete: () => {
              this.router.navigate(['..'],{relativeTo:this.route});
              this.snackBar.openSnackBarSuccess();
            }
           }) 
          
      }else{
        this.snackBar.openSnackBarError(this.RoleForm.invalid)
      }
  }*/

refreshdata(){
    this.dataSource$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        var data2 = data.filter((x:any) => x.name !="employer" && x.name !="superuser" && x.name !="shopowner" && x.name !="employee")
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = data2;
        console.log(data2)
      })
    ).subscribe();
  
  }
  delete(role:string){
      this._delete.deleteRole(role).subscribe(
        { 
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () =>  this.refreshdata()
        }
      )
  }
}
