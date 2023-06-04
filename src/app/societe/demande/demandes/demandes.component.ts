import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { ListUsersService } from 'src/app/dyno-admin/http/list-users.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.scss'],
})
export class DemandesComponent  implements OnInit,OnDestroy{

  constructor(private router: Router, private route: ActivatedRoute,private service:ListUsersService ){
    
  }
  ngOnInit(): void {
    this.getDemandes();
    this.dataSource$ = this.demandes$;
    this.displayedColumns=[ 'weight', 'symbol','etat'];
    this.refreshdata();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [ 'name', 'weight', 'actions'];
  demandes$:any;
  dataSource$: Observable<any> = of([]);  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  demandes:any=[]
  ngAfterViewInit() {
  }


  Redirect(){
      this.router.navigate(['createDemande'], {relativeTo: this.route});
  }
  
  getDemandes(){
    var token = localStorage.getItem('Token');
    if(token)
    {
      var decodedToken:any = jwt_decode(token);  
      console.log(decodedToken) 
      this.demandes$ = this.service.getdemandes(decodedToken.Id);
    }
      
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
