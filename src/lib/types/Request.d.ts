import { REQUEST_STATUS } from '../constants/requests'

export interface TypeRequestResponse<T, E = PostgrestError | null> {
  data: T
  pagination?: {
    pages: number
    count: number
  }
  error: E | PostgrestError | null
}

export interface TypeRequestPagination {
  page: number
  limit: number
}

export type TypeRequestStatus =
  (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS]
