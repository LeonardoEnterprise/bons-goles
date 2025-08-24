import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { DialogFooter } from "../ui/dialog";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center">
        <DialogTitle className="mt-4 text-2xl">Criar uma conta</DialogTitle>
        <DialogDescription className="font-medium">
          Conecte-se à Bons Goles e aproveite um experiência para quem aproveita
          cada momento.
        </DialogDescription>

        <DialogFooter className="mt-4 flex flex-col gap-4">
          <Button className="rounded-full" variant="outline" size="lg" asChild>
            <Link href="/authentication">Login com e-mail</Link>
          </Button>
          <Button
            className="rounded-full"
            size="lg"
            onClick={handleGoogleSignIn}
          >
            Continue com o google
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
