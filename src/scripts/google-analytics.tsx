import Script from "next/script";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-0M1XRGY1PQ"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-0M1XRGY1PQ');
        `}
      </Script>
    </>
  );
}
