export class CreateWorkspaceDto {
  name: string;
  logo?: string;
  mainDomain?: string;

  constructor(name: string, logo?: string, mainDomain?: string) {
    this.name = name;
    this.logo = logo;
    this.mainDomain = mainDomain;
  }
}
