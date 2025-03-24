export interface TypeFormSignIn {
  email: string;
  password: string;
}

export interface TypeFormSignUp {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface TypeFormManageAccount {
  name: string;
  description: string;
  idCurrency: string;
  color: string;
}

export interface TypeFormManageTag {
  name: string;
  color: string;
}

export interface TypeFormManageTransaction {
  idType: string;
  idBudgetAccount: string;
  date: string;
  name: string;
  description: string;
  amount: string;
  interestRate?: string;
  installments?: string;
}
