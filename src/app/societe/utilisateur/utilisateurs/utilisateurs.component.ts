import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { ListService } from '../../_http/list.service';
import jwt_decode from 'jwt-decode';
import { DeleteService } from '../../_http/delete.service';
import { FireEmploymentDto } from '../../Models/fireEmploymentDto';
import { DeleteDialogComponent } from 'src/app/shared/components/dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployementComponent } from '../update-employement/update-employement.component';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilisateursComponent implements OnInit,OnDestroy {

  constructor(private snackbar:SnackbarService,public dialog: MatDialog,private router: Router, private route: ActivatedRoute , private service:ListService,    private cdr: ChangeDetectorRef,
    private deleteService:DeleteService ){
  
  }
  ngOnInit(): void {
      this.getUtilisateurs()
      this.dataSource$ = this.utilisateurs$;
      this.displayedColumns=['name','categorie','roles', 'actions'];
      this.refreshdata();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  utilisateurs$:any;
  dataSource$: Observable<any> = of([]);  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  fireDto= new FireEmploymentDto()
  Id:any;
  Roles :any=[]
  RedirectCreeUtilisateur(){
      this.router.navigate(['creeUtilisateur'], {relativeTo: this.route}); 
  }

  RedirectNewCreeUtilisateur(){
    this.router.navigate(['creeNewUtilisateur'], {relativeTo: this.route}); 
}

  
  getUtilisateurs(){
    var token = localStorage.getItem('Token');
    if(token)
    {
      var decodedToken:any = jwt_decode(token);
      this.Id = decodedToken.Id  
      this.utilisateurs$ = this.service.getUtilisateurs(this.Id);
    }
  }

  fireUtilisateur( mail:string){
    this.fireDto.idEmployer = this.Id;
    this.fireDto.mailEmployee = mail;
    this.deleteService.deleteUtilisateur(this.fireDto).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.refreshdata();
        }
      }
    )
  }

  openDialog(mail:any): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data:{mail:mail}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result)
        this.fireUtilisateur(mail)
      
    });
  }

  openDialogEdit(mail:any,role:any): void {
    let dialogRef = this.dialog.open(UpdateEmployementComponent, {
      
      data:{mail:mail,curentRole:role}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result)
        this.refreshdata()
              
    });
  }

  redirect(id:any,activated:any){
    if(activated==true)
    this.router.navigate(['/societe/payer',id]);
    else 
    this.snackbar.openSnackBarErrorSimple('Employé doit étre activer')
  }

  redirectPayementHistorique(id:any,iduser:any){
    this.router.navigate(['/societe/PayementHistorique',id,{user:iduser}]);
  }


refreshdata(){
    this.dataSource$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = data;
        console.log(data);
      })
    ).subscribe(
      {
        error:(err)=> console.log(err)
        
      }
    );
  
  }

}
