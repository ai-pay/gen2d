"use client";

import { SessionStatus } from "ai-pay";

export function AiPayPrompts({
  browserExtensionInstalled,
  sessionState,
} : {
    browserExtensionInstalled: boolean;
    sessionState: SessionStatus;
}) {

  if (!browserExtensionInstalled) {
    return <p className="w-full text-neutral-600 text-sm">
      Generating images requires <a 
        href="https://www.joinaipay.com" 
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        AI Pay
      </a>. AI Pay is a browser extension that allows users to pay for their individual AI usage, no subscriptions, only pay for what you use. <a 
        href="https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg" 
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get started for free
      </a> (reload the page after downloading the extension).
    </p>;
  }

  if (sessionState !== "ACTIVE") {
    return <p className="w-full text-neutral-600 text-sm">
      Generating images requires an AI Pay session. Start a session using the AI Pay browser extension or <a 
        href="https://www.joinaipay.com/welcome" 
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        learn how to start a session
      </a>.
    </p>;
  }

  return null;
}