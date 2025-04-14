import { useRouter } from 'vue-router'

const router = useRouter()
export default function errorHandler(error: any, optionalMessage: string) {
  if (error.message.includes('JWT')) {
    router.push({ name: 'Login' })
  }
  throw new Error(`${optionalMessage} : ${error.message}`)
}
