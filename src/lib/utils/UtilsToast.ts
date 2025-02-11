import { toast } from 'sonner'

export class UtilsToast {
  static success(message: string) {
    toast.success(message)
  }
  static error(message: string) {
    toast.error(message)
  }
  static warning(message: string) {
    toast.warning(message)
  }
  static info(message: string) {
    toast.info(message)
  }
}
