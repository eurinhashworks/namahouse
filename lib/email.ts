// Fonctions utilitaires pour l'envoi d'emails
// À implémenter avec un service comme Nodemailer, SendGrid, etc.

export async function sendEmail(options: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  // Implémentation de l'envoi d'email
  console.log(`Email envoyé à ${options.to} avec le sujet: ${options.subject}`);
  // Ici, intégrer un service d'envoi d'emails réel
}