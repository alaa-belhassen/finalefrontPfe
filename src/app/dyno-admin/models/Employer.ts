import { IEmployer } from "./IEmployer";

export class Employer implements IEmployer {
    Name!: string;
    Password!: string;
    Email!: string;
    Role!: string;
    walletpublickey!:string;
    numeroTelEntreprise!: string;
    adresseFacturation!: string;
    codeTVA!: string;
    adresseEntreprise!: string;
    EmailRH !: string;
    NumTelRH!: string;
    matriculeFiscale!:string;
    paymentMethode!: string;
  }