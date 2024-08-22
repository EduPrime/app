import { toastController } from '@ionic/vue'

export default async function showToast(
  message: string, // Mensagem obrigatória
  position: 'top' | 'middle' | 'bottom' = 'top',
  color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark' = 'success', // Cor opcional, padrão é 'success'
) {
  const toast = await toastController.create({
    message,
    duration: 2500,
    position,
    color,
  })

  await toast.present()
}
