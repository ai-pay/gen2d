import { SessionStatus } from "ai-pay";

export function AiPayPrompts({
  browserExtensionInstalled,
  sessionState,
  children,
} : {
    browserExtensionInstalled: boolean;
    sessionState: SessionStatus;
    children: React.ReactNode;
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
      </a>. AI Pay is a browser extension that allows users to pay for their individual AI usage, to facilitate AI services (like this one). <a 
        href="https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg" 
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get started for free
      </a>. (Note: reload the page when you download the extension)
    </p>;
  }

  if (sessionState !== "ACTIVE") {
    return <p className="w-full text-neutral-600 text-sm">
      Generating images requires an AI Pay session. Start a session using the AI Pay browser extension or <a href="https://www.joinaipay.com/welcome" className="text-blue-500 hover:underline">
        learn how to start a session
      </a>.
    </p>;
  }

  return children;
}