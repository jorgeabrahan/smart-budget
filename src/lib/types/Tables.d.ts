/* PLAN TABLES */
export interface TypePlanBenefitsRegistry {
  id: number;
  description: string;
  id_plan: number;
}
export interface TypePlansRegistry {
  id: number;
  name: string;
  description: string;
  monthly_price: number;
  duration_months: number | null;
  id_extends_plan: number | null;

  // relationships
  plan_benefits?: TypePlanBenefitsRegistry[];
}

export interface TypeSubscriptionLogsRegistry {
  id: number;
  id_user: string;
  id_plan: number;
  start_date: string;
  end_date: string | null;

  // relationships
  plans: Pick<TypePlansRegistry, 'name'>;
}

/* BUDGET ACCOUNT TABLES */
export interface TypeCurrenciesRegistry {
  id: number;
  iso_code: string;
  currency: string;
}
export interface TypeBudgetAccountsRegistry {
  id: number;
  id_user: string;
  name: string;
  description: string;
  color: string;
  id_currency: number;
  created_at: string;
}

/* BUDGET TRANSACTION TABLES */
export interface TypeTagsRegistry {
  id: number;
  id_user: string;
  name: string;
  color: string;
}
export interface TypeTransactionLoanDetailsRegistry {
  id: number;
  id_transaction: number;
  interest_rate: number;
  installments: number;
}
export interface TypeTransactionTagsRegistry {
  id: number;
  id_tag: number;
  id_transaction: number;
}
export interface TypeTransactionTypesRegistry {
  id: number;
  name: string;
  description: string;
  operation: 1 | -1 | null;
}
export interface TypeTransactionsRegistry {
  id: number;
  id_user: string;
  id_budget_account: number;
  name: string;
  description: string;
  amount: number;
  id_type: number;
  date: string;
  created_at: string;
  id_parent_transaction: number | null;

  // relationships
  transaction_tags?: TypeTransactionTagsRegistry[];
  transaction_loan_details?: TypeTransactionLoanDetailsRegistry;
}

/* USER TABLES */
export interface TypeUserDetailsRegistry {
  id: string;
  active: boolean;
  url_profile_picture: string;
  id_plan: number;
}
