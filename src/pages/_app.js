// import '../styles/styles.css';
// import '../styles/About.css';
// import '../styles/app.css';
// import '../styles/CountryBanner.css';
// import '../styles/CountryDetailPage.css';
// import '../styles/Documents.css';
// import '../styles/FaqSection.css';
// import '../styles/Header.css';
// import Script from "next/script";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import * as fbq from "../lib/fpixel";
// function App({ Component, pageProps }) {

//   const router = useRouter();



//   useEffect(() => {
//     // This pageview only triggers the first time (it's important for Pixel to have real information)
//     fbq.pageview();

//     const handleRouteChange = (url) => {
//       fbq.pageview();
//     };


//     // Push route change event to GTM
//       window.dataLayer = window.dataLayer || [];
//       window.dataLayer.push({
//         event: "pageview",
//         page: url,
//       });
//   // Google Analytics Page View
//       window.gtag && window.gtag('config', 'G-MZ1H4GLECG', {
//         page_path: url,
//       });
    




//     router.events.on("routeChangeComplete", handleRouteChange);
//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router.events]);

//   // return <Component {...pageProps} />;
//   return (
//     <>

//         {/* Google Analytics (gtag.js) */}
//       <Script
//         strategy="afterInteractive"
//         src="https://www.googletagmanager.com/gtag/js?id=G-MZ1H4GLECG"
//       />
//       <Script
//         id="google-analytics"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-MZ1H4GLECG');
//           `,
//         }}
//       />

//      {/* Google Tag Manager - Head */}
//      <Script
//         id="google-tag-manager"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer','GTM-TVKSSM2W');
//           `,
//         }}
//       />



//      <Script
//         id="fb-pixel"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             !function(f,b,e,v,n,t,s)
//             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//             n.queue=[];t=b.createElement(e);t.async=!0;
//             t.src=v;s=b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t,s)}(window, document,'script',
//             'https://connect.facebook.net/en_US/fbevents.js');
//             fbq('init', '1121954586079830');
//           `,
//         }}
//       />


//       {/* Google Tag Manager - Body */}
//       <noscript>
//         <iframe
//           src="https://www.googletagmanager.com/ns.html?id=GTM-TVKSSM2W"
//           height="0"
//           width="0"
//           style={{ display: "none", visibility: "hidden" }}
//         ></iframe>
//       </noscript>
// <Component {...pageProps} />
//     </>
//   );
// }

// export default App;



import '../styles/styles.css';
import '../styles/About.css';
import '../styles/app.css';
import '../styles/CountryBanner.css';
import '../styles/CountryDetailPage.css';
import '../styles/Documents.css';
import '../styles/FaqSection.css';
import '../styles/Header.css';
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as fbq from "../lib/fpixel";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Facebook Pixel tracking
    fbq.pageview();

    const handleRouteChange = (url) => {
      fbq.pageview();

      // Push route change event to GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pageview",
        page: url,
      });

      // Google Analytics Page View
      window.gtag && window.gtag('config', 'G-MZ1H4GLECG', {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-MZ1H4GLECG"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MZ1H4GLECG');
          `,
        }}
      />

      {/* Google Tag Manager - Head */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TVKSSM2W');
          `,
        }}
      />

      {/* Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1121954586079830');
          `,
        }}
      />

      {/* Google Tag Manager - Body */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TVKSSM2W"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <Component {...pageProps} />
    </>
  );
}

export default App;
