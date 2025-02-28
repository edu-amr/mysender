import Script from "next/script";

export function CrispChat() {
  return (
    <Script id="crisp-script" strategy="afterInteractive">
      {`window.$crisp = [];
    window.CRISP_WEBSITE_ID = "32d26f1c-b7a9-4e25-bb56-9506d73ea2e5";
    (function() {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  `}
    </Script>
  );
}
