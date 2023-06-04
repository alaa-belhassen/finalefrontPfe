import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, catchError, distinctUntilChanged, map, of, takeUntil, tap, throwError } from 'rxjs';
import { DeleteUsersService } from 'src/app/dyno-admin/http/delete-users.service';
import { ListUsersService } from 'src/app/dyno-admin/http/list-users.service';
import { filterEmployerDetails } from 'src/app/dyno-admin/models/FilterModels/filterEmployerDetails';
import { filterEmployers } from 'src/app/dyno-admin/models/FilterModels/filterEmployer';
import { MatTableFilter } from 'mat-table-filter';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
import { BlockuserComponent } from 'src/app/shared/components/dialog/blockuser/blockuser.component';
import { ShareProviderService } from 'src/app/shared/services/share-provider.service';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { UpdateService } from 'src/app/dyno-admin/http/update.service';
import { PublicKeyService } from 'src/app/dyno-admin/services/public-key.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TableComponent implements OnInit,OnDestroy {
  filterEntity:filterEmployerDetails;
  filterType: MatTableFilter;
  constructor(private share:PublicKeyService,private update:UpdateService,private transaction:PhantomProviderService,private shareData:ShareProviderService,private snackbar:SnackbarService,public dialog: MatDialog,private router: Router,private deleteService:DeleteUsersService  ,  private route: ActivatedRoute, private service:ListUsersService  ){
  
    this.shareData.data$.subscribe((res:any)=>{
      this.provider=res;
      console.log(res);
    })

    this.share.data2$.subscribe((res:any)=>{
      this.refresh=res;
      console.log(res);
    })

    this.filterEntity = new filterEmployerDetails();
    this.filterEntity.employer = new filterEmployers();
    this.filterType = MatTableFilter.ANYWHERE;
  }

  
  ngOnInit(): void {
    this.getEmployers("blocked");
    this.getcommercants("blocked");
    this.getemployé("all")
    this.changeData(this.state);
   
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  refresh:any
  rent:any;
  provider:any;
  private destroy$ = new Subject<void>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  employer$:any;
  commercant$:any;
  employee$:any;
  dataSource$: Observable<any> = of([]);  
  state=1;
  tabledata:any[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  demandes:any=[]
  result:any ;
  blockedState=false;

  
 changeData(filter:any){
    if (filter == 1){
      this.dataSource$ = this.employer$;
      this.displayedColumns=[ 'name', 'weight', 'symbol','nbemployer','actions'];
      this.refreshdata();
    }else if ( filter == 2 ){
      //display shopowners
      this.dataSource$ = this.commercant$; 
      this.displayedColumns=[ 'nameCommercant', 'weight', 'actions'];
      this.refreshdata();
    } else if ( filter == 3 ){
      //display shopowners
      this.dataSource$ = this.employee$; 
      this.displayedColumns=[ 'nameemployee',  'actions2'];
      this.refreshdata();
    }

  }

  async makeTransaction(publicKey:any,id:any){
    
    var sender = sessionStorage.getItem('wallet');
    console.log(sender)
    console.log(this.provider);

    if (this.provider!="initialProvider"){
      
      if(sender){
      this.rent = await this.transaction.getRentExeptionValue(publicKey)
      console.log(this.rent/10000)
      console.log(this.provider)
      try { 
        var signature = await this.transaction.transaction(sender,publicKey,this.provider,Math.ceil((this.rent+100000)/10000));
        console.log(signature)
        if(signature){
          this.update.modifierEmployee(id).subscribe({
            next:(v)=> {
              this.snackbar.openSnackBarSuccess()
              this.refreshdata();
            },
            error:(err) => console.log(err)
          });
        }
       return signature;
      } catch(e:any) {
        console.log(e)
        if(e.message=="User rejected the request."){
          this.router.navigate(['/dynoAdmin/clients']);
          
          this.snackbar.openSnackBarErrorSimple("Transaction annuler.")
        }
     }
    }
    

 
}else{
  this.snackbar.openSnackBarErrorSimple("Il faut se connecter a un portefeuille")
}
return null;
}


  Redirect(){
    if (this.state == 1){
      this.router.navigate(['newclientsociete'], {relativeTo: this.route});
    }else if (this.state == 2 ){
      this.router.navigate(['newclientcomercant'], {relativeTo: this.route});
    }
  }
  
  getEmployers(type:any){
    this.employer$ = this.service.getUsers('employer',type);
  }

  getcommercants(type:any){
    this.commercant$ = this.service.getUsers('shopowner',type);
  }
  getemployé(type:any){
    this.employee$ = this.service.getUsers('employee',type);
  }

unblock(id:any){
  if(this.state==1)
  this.deleteService.unblockEmployer(id).subscribe(
    { 
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        this.refreshdata();
        this.snackbar.openSnackBarSuccess();
      }  
    });
else if(this.state==2)
    this.deleteService.unblockShopowner(id).subscribe(
      { 
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.refreshdata();
          this.snackbar.openSnackBarSuccess();
        }  
      });


}
 blocked(){
  this.blockedState = ! this.blockedState;
  if( this.blockedState==false){
    this.getEmployers("blocked");
    this.getcommercants("blocked");
    this.changeData(this.state);
  }else if ( this.blockedState==true){
    if (this.state==1 ){
      this.getEmployers("all");
      this.dataSource$ = this.employer$;

    }else if (this.state==2 ){
      this.getcommercants("all");
      this.dataSource$ = this.commercant$;

    } 
    this.refreshdata();
  }
 }

  refreshdata(){
    this.dataSource$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      tap(data => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data =  data;
        console.log(data)

      })
    ).subscribe();
  
  }

  
  openDialog(id:any): void {
    let dialogRef = this.dialog.open(BlockuserComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result)
        this.delete(id)
      
    });
  }

 delete(id:any){
    if(this.state==1)
      this.deleteService.DeleteEmployer(id).subscribe(
        { 
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => {
            this.refreshdata();
            this.snackbar.openSnackBarErrorSimple("société bloquer");
          }  
        }
      )
    else if(this.state==2)
      this.deleteService.DeleteShopowner(id).subscribe(
        { 
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => {
            this.refreshdata()
            this.snackbar.openSnackBarErrorSimple("commercant bloquer");
          } 
        }
      )
      
  }

}
