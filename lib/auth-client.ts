// import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_APP_URL,
// });

// Fonctions utilitaires pour l'authentification
// export const handleSignIn = async (email: string, password: string) => {
//   try {
//     const result = await authClient.signIn.email({
//       email,
//       password,
//     });
//     
//     if (result.error) {
//       toast.error(result.error.message);
//       return { success: false, error: result.error.message };
//     }
//     
//     toast.success("Connexion réussie !");
//     return { success: true, data: result.data };
//   } catch (error) {
//     toast.error("Une erreur est survenue lors de la connexion");
//     return { success: false, error: "Erreur inconnue" };
//   }
// };

// export const handleSignUp = async (name: string, email: string, password: string) => {
//   try {
//     const result = await authClient.signUp.email({
//       name,
//       email,
//       password,
//     });
//     
//     if (result.error) {
//       toast.error(result.error.message);
//       return { success: false, error: result.error.message };
//     }
//     
//     toast.success("Compte créé avec succès ! Veuillez vérifier votre email.");
//     return { success: true, data: result.data };
//   } catch (error) {
//     toast.error("Une erreur est survenue lors de la création du compte");
//     return { success: false, error: "Erreur inconnue" };
//   }
// };

// export const handleSignOut = async () => {
//   try {
//     await authClient.signOut();
//     toast.success("Vous avez été déconnecté");
//     return { success: true };
//   } catch (error) {
//     toast.error("Une erreur est survenue lors de la déconnexion");
//     return { success: false, error: "Erreur inconnue" };
//   }
// };

// export const handlePasswordReset = async (email: string) => {
//   try {
//     const result = await authClient.requestPasswordReset({
//       email,
//       redirectTo: "/reset-password",
//     });
//     
//     if (result.error) {
//       toast.error(result.error.message);
//       return { success: false, error: result.error.message };
//     }
//     
//     toast.success("Un email de réinitialisation a été envoyé");
//     return { success: true, data: result.data };
//   } catch (error) {
//     toast.error("Une erreur est survenue lors de la demande de réinitialisation");
//     return { success: false, error: "Erreur inconnue" };
//   }
// };

// export const handlePasswordResetConfirm = async (token: string, newPassword: string) => {
//   try {
//     const result = await authClient.resetPassword({
//       token,
//       newPassword,
//     });
//     
//     if (result.error) {
//       toast.error(result.error.message);
//       return { success: false, error: result.error.message };
//     }
//     
//     toast.success("Mot de passe réinitialisé avec succès !");
//     return { success: true, data: result.data };
//   } catch (error) {
//     toast.error("Une erreur est survenue lors de la réinitialisation du mot de passe");
//     return { success: false, error: "Erreur inconnue" };
//   }
// };