import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Netlify Widget */}
        <script
          async
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
          `,
          }}
        />
      </body>
      <script
        async
        src="https://cdn.panelbear.com/analytics.js?site=5LAreQZqo8I"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
    window.panelbear = window.panelbear || function() { (window.panelbear.q = window.panelbear.q || []).push(arguments); };
    panelbear('config', { site: '5LAreQZqo8I' });`,
        }}
      />
    </Html>
  );
}
