import { useState, useEffect } from "react";
import { X, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem("pwa-install-dismissed");
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < 7 * 24 * 60 * 60 * 1000) {
      setDismissed(true);
      return;
    }

    // Android/Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS detection
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandalone = ("standalone" in navigator) && (navigator as unknown as { standalone: boolean }).standalone;
    if (isIOS && !isInStandalone) {
      setShowIOSPrompt(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  }

  function handleDismiss() {
    setDismissed(true);
    setDeferredPrompt(null);
    setShowIOSPrompt(false);
    localStorage.setItem("pwa-install-dismissed", String(Date.now()));
  }

  if (isInstalled || dismissed) return null;
  if (!deferredPrompt && !showIOSPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-xl border border-border bg-card p-4 shadow-lg">
      <button onClick={handleDismiss} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>

      {deferredPrompt ? (
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 shrink-0">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Instalar aplicativo</p>
            <p className="text-xs text-muted-foreground mt-0.5 mb-3">Acesso rápido direto da tela inicial</p>
            <Button size="sm" onClick={handleInstall} className="h-8 text-xs">Instalar</Button>
          </div>
        </div>
      ) : showIOSPrompt ? (
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 shrink-0">
            <Share className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Instalar no iPhone</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Toque em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela de Início</strong>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
