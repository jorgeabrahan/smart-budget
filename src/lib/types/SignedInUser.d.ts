import { User } from '@supabase/supabase-js'
import { TypeUserDetailsRegistry } from './Tables'

export type TypeSignedInUser = User & TypeUserDetailsRegistry
