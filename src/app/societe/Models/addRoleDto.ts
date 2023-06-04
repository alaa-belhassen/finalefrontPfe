import { permission } from "./permission";

export class addRoleDto {
    roleName !: string;
    Permission !:Array<string>;
    idEmployer ! :string;
  }