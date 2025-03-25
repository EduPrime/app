export async function sendEmail({ to, subject, text }: { to: string | null; subject: string; text: string }) {
  console.log('Sending email to:', to)
  console.log('Subject:', subject)
  console.log('Text:', text)
}
