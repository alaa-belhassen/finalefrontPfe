import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, Observable, of, takeUntil, tap } from 'rxjs';
import { ListUsersService } from 'src/app/dyno-admin/http/list-users.service';
import jwt_decode from 'jwt-decode';
import { GetMethodesService } from 'src/app/commercant/http/get-methodes.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent {
  constructor(private router: Router, private route: ActivatedRoute,private service:GetMethodesService ){
    
  }
  ngOnInit(): void {
    this.getDemandes();
    this.dataSource$ = this.demandes$;
    this.displayedColumns=['position', 'weight', 'symbol','etat','Actions'];
    this.refreshdata();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'name', 'weight'];
  demandes$:any;
  dataSource$: Observable<any> = of([]);  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  demandes:any=[]
  ngAfterViewInit() {
  }
  RedirectDetails(id:any,iduser:any,somme:any,etat:any){
    if(etat=="accepter" )
      this.router.navigate(['/commercant/demande/detailsDemandeAccepter',id,{user:iduser,somme:somme}] );
  }

  Redirect(){
      this.router.navigate(['créeDemandeCommercant'], {relativeTo: this.route});
  }
  
  getDemandes(){
    var token = localStorage.getItem('Token');
    if(token)
    {
      var decodedToken:any = jwt_decode(token);  
      console.log(decodedToken) 
      this.demandes$ = this.service.getdemandePayementByShopowner(decodedToken.Id);
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
