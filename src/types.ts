export interface User {
  name: string;
  uri: string;
  email: string;
  uris: {
    company: string;
  };
}

export interface Company {
  name: string;
  uri: string;
}


export interface CompanyWithUsers {
  name: string;
  employees: string;
}
