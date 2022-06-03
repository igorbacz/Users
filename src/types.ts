export interface DataInterface {
  name: string;
  uri: string;
  email: string;
  uris: object;
  company: string;
}

export interface CompaniesInterface {
  name: string;
  uri: string;
}

export interface NewCompaniesInterface {
  name: string;
  employees: string[];
}

export interface NewCompanies {
  length: number;
  newCompanies: Array<NewCompaniesInterface>;
}

export interface Companies {
  companies: Array<CompaniesInterface>;
}
