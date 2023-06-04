import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../../_http/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Observable, of, takeUntil, tap } from 'rxjs';
import { FireEmploymentDto } from '../../Models/fireEmploymentDto';
import { DeleteService } from '../../_http/delete.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-listpayement-employee',
  templateUrl: './listpayement-employee.component.html',
  styleUrls: ['./listpayement-employee.component.scss']
})
export class ListpayementEmployeeComponent implements OnInit{

  
  constructor(private list:ListService,public dialog: MatDialog,private router: Router, private route: ActivatedRoute , private service:ListService,    private cdr: ChangeDetectorRef,
    private deleteService:DeleteService ){
  
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idemployee = params['id']
      this.name = params['user']

    });
    var token = localStorage.getItem('Token');
    if(token){
      var decodedToken:any = jwt_decode(token); 
      console.log(decodedToken);
      this.idemployer = decodedToken.Id
    }
    console.log(this.name)
    this.dataSource$ = this.list.getPayementById(this.idemployee,this.idemployer);
    this.displayedColumns=['position','name','categorie'];
    this.refreshdata();
   
  }
  idemployer:any;
  idemployee:any;
  name:any;
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
