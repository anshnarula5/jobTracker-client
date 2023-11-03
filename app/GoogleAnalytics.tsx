import Script from "next/script";

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js? 
      id=G-161DY7C4WS`}
    ></Script>
    <Script
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-161DY7C4WS');
        `,
      }}
    ></Script>
  </>
);
export default GoogleAnalytics;