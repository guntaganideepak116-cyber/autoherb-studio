import { useEffect, useState } from "react";
import { Download, Share, X, Plus } from "lucide-react";
import { registerServiceWorker } from "@/lib/pwa";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const KEY = "autoherb-install-dismissed";
const DISMISS_DAYS = 30;

function dismissedRecently() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function InstallBanner() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    registerServiceWorker();

    if (isStandalone() || dismissedRecently()) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => setVisible(false);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    const ua = window.navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isIos && isSafari) {
      timer = setTimeout(() => {
        setIosHint(true);
        setVisible(true);
      }, 6000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return;
    setBusy(true);
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } finally {
      setBusy(false);
      setDeferred(null);
      dismiss();
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Install AutoHerb"
      className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-60 mx-auto max-w-md rounded-2xl border border-gold/40 bg-background/95 p-4 shadow-(--shadow-gold) backdrop-blur-xl lg:inset-x-auto lg:right-6 lg:bottom-6"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss install banner"
        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-gold"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-surface">
          <Download className="h-5 w-5 text-gold" aria-hidden />
        </span>
        <div>
          <p className="font-display text-base font-semibold text-foreground">Install AutoHerb</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Get quick access to AutoHerb Ongole
          </p>
        </div>
      </div>

      {iosHint && !deferred ? (
        <p className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-2 text-xs text-muted-foreground">
          Tap
          <Share className="h-3.5 w-3.5 text-gold" aria-hidden />
          Share, then
          <Plus className="h-3.5 w-3.5 text-gold" aria-hidden />
          <span className="text-foreground">Add to Home Screen</span>
        </p>
      ) : null}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={dismiss}
          className="h-11 flex-1 rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          Not now
        </button>
        {deferred ? (
          <button
            type="button"
            onClick={install}
            disabled={busy}
            className="h-11 flex-1 rounded-full bg-(image:--gradient-gold) text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Installing…" : "Install"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
