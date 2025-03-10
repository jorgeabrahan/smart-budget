export interface TypePlanBenefitsRegistry {
  id: number
  description: string
  id_plan: number
}
export interface TypePlansRegistry {
  id: number
  name: string
  description: string
  monthly_price: number
  duration_months: number | null
  id_extends_plan: number | null

  // relationships
  plan_benefits?: TypePlanBenefitsRegistry[]
}

export interface TypeSubscriptionLogsRegistry {
  id: number
  id_user: string
  id_plan: number
  start_date: string
  end_date: string | null

  // relationships
  plans: Pick<TypePlansRegistry, 'name'>
}

export interface TypeCurrenciesRegistry {
  id: number
  iso_code: string
  currency: string
}
export interface TypeAccountsRegistry {
  id: number
  id_user: string
  name: string
  description: string
  color: string
  id_currency: number
}

export interface TypeUserDetailsRegistry {
  id: string
  active: boolean
  url_profile_picture: string
  id_plan: number
}
