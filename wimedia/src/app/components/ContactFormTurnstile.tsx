"use client";
import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export default function ContactFormTurnstile({
  onToken,
}: { onToken: (t: string | null) => void }) {
  const ref = useRef<TurnstileInstance | null>(null);
  const [ready, setReady] = useState(false);

  return (
    <div className="mt-2">

      <div hidden={ready === false} />
      <Turnstile
        ref={ref}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onLoad={() => setReady(true)}
        onSuccess={(t) => onToken(t)}
        onExpire={() => {
          onToken(null);
          ref.current?.reset();
        }}
        onError={(code) => {
          console.warn("turnstile error", code);

          onToken(null);
          ref.current?.reset();
        }}
        options={{
          retry: "auto",
          retryInterval: 5000,
          refreshExpired: "auto",
          refreshTimeout: "auto",
          execution: "render",
          appearance: "always",
        }}
      />
    </div>
  );
}