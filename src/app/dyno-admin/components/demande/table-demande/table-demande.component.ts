import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, of, takeUntil, tap } from 'rxjs';
import { ListUsersService } from 'src/app/dyno-admin/http/list-users.service';
import { MatTableFilter } from 'mat-table-filter';
import { filterDemandeTransaction } from 'src/app/dyno-admin/models/FilterModels/filterdemandeTransaction';
import { filterEmployerDetails } from 'src/app/dyno-admin/models/FilterModels/filterEmployerDetails';
import { filterEmployers } from 'src/app/dyno-admin/models/FilterModels/filterEmployer';
import { filterShopowner } from 'src/app/dyno-admin/models/FilterModels/filterShopowner';
import { filterDemandePayement } from 'src/app/dyno-admin/models/FilterModels/filterDemandePayement';

@Component({
  selector: 'app-table-demande',
  templateUrl: './table-demande.component.html',
  styleUrls: ['./table-demande.component.scss'],
})
export class TableDemandeComponent implements OnInit,OnDestroy{
  filterEntity:any;
  filterType: MatTableFilter;
  constructor(private router: Router,    private route: ActivatedRoute, private service:ListUsersService  ){
    this.filterType = MatTableFilter.ANYWHERE;
  }
  ngOnInit(): void {
    this.getEmployers();
    this.getcommercants();
    this.refreshdata();
    this.changeData(this.state);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [ 'name', 'weight', 'symbol'];
  employer$:any;
  commercant$:any;
  dataSource$: Observable<any> = of([]);  
  state=1;
  tabledata:any[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  


 changeData(filter:any){
    if (filter == 1){
      this.filterEntity = new filterDemandeTransaction();
      this.filterEntity.employer = new filterEmployerDetails();
      this.filterEntity.employer.employer = new filterEmployers();
      this.dataSource$ = this.employer$;
      this.displayedColumns=[ 'namesociete', 'weight', 'symbol','etat','Actions'];
      this.refreshdata();
    }else if ( filter == 2 ){
      this.filterEntity = new filterDemandePayement();
      this.filterEntity.shopowner = new filterShopowner();
      this.filterEntity.shopowner.employer = new filterEmployers();
      this.dataSource$ = this.commercant$; 
      this.displayedColumns=['namecommercant', 'weight', 'besoindargent','etat','Actions'];
      this.refreshdata();
    }
    
  }

  RedirectDetails(id:any,iduser:any,somme:any,etat:any){
    if(etat=="encours" && this.state==1)
      this.router.navigate(['/dynoAdmin/societedetails',id,{user:iduser,somme:somme}] );
    else if (etat=="encours" && this.state==2)
      this.router.navigate(['/dynoAdmin/Commercantdetails',id,{user:iduser,somme:somme}] );
    }

  Redirect(){
    if (this.state == 1){
      this.router.navigate(['newclientsociete'], {relativeTo: this.route});
    }else if (this.state == 2 ){
      this.router.navigate(['newclientcomercant'], {relativeTo: this.route});
    }
  }

  getEmployers(){
    this.employer$ = this.service.getAllDemandesTransaction();
  }
  getcommercants(){
    this.commercant$ = this.service.getAllDemandesPayement();
  }

  format(){
    console.log(this.filterEntity.date)
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
