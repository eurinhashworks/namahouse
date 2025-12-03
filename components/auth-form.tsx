"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
// import { 
//   handleSignIn, 
//   handleSignUp, 
//   handlePasswordReset, 
//   handlePasswordResetConfirm 
// } from "@/lib/auth-client";

interface AuthFormProps {
  mode: "signin" | "signup" | "forgot-password" | "reset-password";
  token?: string;
  onModeChange: (mode: "signin" | "signup" | "forgot-password" | "reset-password") => void;
}

export function AuthForm({ mode, token, onModeChange }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     switch (mode) {
  //       case "signin":
  //         await handleSignIn(email, password);
  //         break;
  //       case "signup":
  //         if (password !== confirmPassword) {
  //           toast({
  //             title: "Erreur",
  //             description: "Les mots de passe ne correspondent pas",
  //             variant: "destructive",
  //           });
  //           return;
  //         }
  //         await handleSignUp(name, email, password);
  //         break;
  //       case "forgot-password":
  //         await handlePasswordReset(email);
  //         break;
  //       case "reset-password":
  //         if (token) {
  //           if (password !== confirmPassword) {
  //             toast({
  //               title: "Erreur",
  //               description: "Les mots de passe ne correspondent pas",
  //               variant: "destructive",
  //             });
  //             return;
  //           }
  //           await handlePasswordResetConfirm(token, password);
  //         }
  //         break;
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {mode === "signin" && "Connexion"}
          {mode === "signup" && "Créer un compte"}
          {mode === "forgot-password" && "Mot de passe oublié"}
          {mode === "reset-password" && "Réinitialiser le mot de passe"}
        </CardTitle>
        <CardDescription>
          {mode === "signin" && "Connectez-vous à votre compte"}
          {mode === "signup" && "Créez un nouveau compte"}
          {mode === "forgot-password" && "Entrez votre email pour recevoir un lien de réinitialisation"}
          {mode === "reset-password" && "Entrez votre nouveau mot de passe"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={(e) => e.preventDefault()}>
        <CardContent className="space-y-4">
          {(mode === "signup") && (
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          {(mode === "signin" || mode === "signup" || mode === "forgot-password") && (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          
          {(mode === "signin" || mode === "signup" || mode === "reset-password") && (
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          
          {(mode === "signup" || mode === "reset-password") && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Chargement..." : 
              (mode === "signin" && "Se connecter") ||
              (mode === "signup" && "Créer un compte") ||
              (mode === "forgot-password" && "Envoyer le lien") ||
              (mode === "reset-password" && "Réinitialiser le mot de passe")
            }
          </Button>
          
          {mode === "signin" && (
            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => onModeChange("forgot-password")}
                className="text-blue-600 hover:underline"
              >
                Mot de passe oublié ?
              </button>
              <span className="mx-2">|</span>
              <button
                type="button"
                onClick={() => onModeChange("signup")}
                className="text-blue-600 hover:underline"
              >
                Créer un compte
              </button>
            </div>
          )}
          
          {mode === "signup" && (
            <div className="text-center text-sm">
              <span>Déjà un compte ? </span>
              <button
                type="button"
                onClick={() => onModeChange("signin")}
                className="text-blue-600 hover:underline"
              >
                Se connecter
              </button>
            </div>
          )}
          
          {(mode === "forgot-password" || mode === "reset-password") && (
            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => onModeChange("signin")}
                className="text-blue-600 hover:underline"
              >
                Retour à la connexion
              </button>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}