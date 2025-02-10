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
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // return <Component {...pageProps} />;
  return (
    <>
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
<Component {...pageProps} />
    </>
  );
}

export default App;
