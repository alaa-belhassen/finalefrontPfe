import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { ListService } from '../../_http/list.service';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteDialogComponent } from 'src/app/shared/components/dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from '../../_http/delete.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie.component';
import { UpdateTicketComponent } from '../update-ticket/update-ticket.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorieComponent implements OnInit ,OnDestroy{
  constructor(private dialog:MatDialog,private deleteService:DeleteService,private snackbar:SnackbarService,
    private router: Router, private route: ActivatedRoute,private service:ListService ){
  }
  ngOnInit(): void {
    var token = localStorage.getItem("Token");
    
    if(token){
      var decodedToken:any = jwt_decode(token); 
      
      this.id = decodedToken.Id;
    }
    this.getCategorie();
    this.dataSource$ = this.categorie$
    this.displayedColumns=['position',"nameTicket", 'name', 'actions'];
    this.refreshdata();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  categorie$:any;
  dataSource$: Observable<any> = of([]);  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  showElement:any=null;
  id:any;
show(id:any){
  if(this.showElement==null){
    this.showElement = id;
  }else{
    this.showElement=null
  }
}

  Redirect(){
    this.router.navigate(['creeCategorie'],{relativeTo:this.route});
  }
  
  getCategorie(){
    this.categorie$ = this.service.getAllCategorie(this.id);
  }

  openDialog(id:any): void {

    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data:{id:id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed',result);
      if(result)
        this.delete(id)
    });
  }

  openDialogupdate(ticket:any): void {
    this.showElement=null;
    let dialogRef = this.dialog.open(UpdateCategorieComponent, {
      
      data:{id:ticket.IdCategorie}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed',result);
      if(result){
        this.refreshdata();
      }
    });
  }
 

  clickedoutside(element:any){
    this.show(element)
    if(this.showElement != null){
      this.showElement  = null
    }else{
     
    }
  }
  openDialogupdateTicket(ticket:any): void {
    this.showElement=null;
    let dialogRef = this.dialog.open(UpdateTicketComponent, {
      
      data:{id:ticket.idticket,idEmployer:this.id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed',result);
      if(result){
        this.refreshdata();
      }
    });
  }
 
 

delete(id:string){
  this.deleteService.deleteCategorie(id).subscribe(
    {
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        this.snackbar.openSnackBarSuccess();
        this.refreshdata();
      }
    }
  );
}

refreshdata(){
    this.dataSource$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = data;
        console.log(data)
      })
    ).subscribe();
  
  }


}
