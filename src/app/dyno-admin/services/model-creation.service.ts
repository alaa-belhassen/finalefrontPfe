import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Employer } from '../models/Employer';
import { shopowner } from '../models/shopowner';

@Injectable({
  providedIn: 'root'
})
export class ModelCreationService {
  constructor() { }
  public CreateEmployer(EmployerFormGroup:FormGroup,Employer:Employer){
    Employer.Name = EmployerFormGroup.value.raisonsociale; 
    Employer.Password = EmployerFormGroup.value.password;
    Employer.Email = EmployerFormGroup.value.adressemail; 
    Employer.Role = "employer";
    Employer.matriculeFiscale = EmployerFormGroup.value.matriculefiscale; 
    Employer.numeroTelEntreprise = EmployerFormGroup.value.numeroTelEntreprise; 
    Employer.adresseFacturation = EmployerFormGroup.value.adressefacturation;
    Employer.codeTVA = EmployerFormGroup.value.codeTVA; 
    Employer.adresseEntreprise = EmployerFormGroup.value.adresseEntreprise;
    Employer.EmailRH = EmployerFormGroup.value.mailRH; 
    Employer.NumTelRH = EmployerFormGroup.value.numeroRH;
    Employer.paymentMethode = EmployerFormGroup.value.paymentMethode;
    Employer.walletpublickey= EmployerFormGroup.value.walletpublickey;
  }
  
  public CreateShopwowner(EmployerFormGroup:FormGroup,shopowner:shopowner){
    shopowner.Name = EmployerFormGroup.value.raisonsociale; 
    shopowner.password = EmployerFormGroup.value.password;
    shopowner.email = EmployerFormGroup.value.email; 
    shopowner.role = "shopowner";
    shopowner.matriculeFiscale = EmployerFormGroup.value.matriculefiscale; 
    shopowner.adresseFacturation = EmployerFormGroup.value.adresseFacturation;
    shopowner.codeTVA = EmployerFormGroup.value.codeTVA; 
    shopowner.Adresse = EmployerFormGroup.value.adressecommercant; 
    shopowner.NumTel= EmployerFormGroup.value.numeroTel;
    shopowner.PaymentMethode = EmployerFormGroup.value.paymentMethode;
    shopowner.walletpublickey = EmployerFormGroup.value.walletpublickey;
    shopowner.delaiPayement = EmployerFormGroup.value.delaipayement;
    shopowner.commission = EmployerFormGroup.value.commission;
  }

}
