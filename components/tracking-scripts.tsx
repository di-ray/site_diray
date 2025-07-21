"use client"

import Script from "next/script"

export interface TrackingScriptsProps {
  googleAnalyticsId?: string
  facebookPixelId?: string
  linkedInPartnerId?: string
  googleAdsId?: string
}

export function TrackingScripts({
  googleAnalyticsId = "G-XXXXXXXXXX", // Substitua pelo ID real
  facebookPixelId = "XXXXXXXXXXXX", // Substitua pelo ID real
  linkedInPartnerId = "XXXXXXX", // Substitua pelo ID real
  googleAdsId = "AW-XXXXXXXXX" // Substitua pelo ID real
}: TrackingScriptsProps) {
  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* LinkedIn Insight Tag */}
      {linkedInPartnerId && (
        <>
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${linkedInPartnerId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `}
          </Script>
          <Script id="linkedin-insight-script" strategy="afterInteractive">
            {`
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
            `}
          </Script>
        </>
      )}

      {/* Google Ads Conversion Tracking */}
      {googleAdsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');
            `}
          </Script>
        </>
      )}
    </>
  )
}

// Hook para tracking de eventos
export const useTracking = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters)
    }

    // LinkedIn
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', { conversion_id: eventName })
    }
  }

  const trackFormSubmission = (formName: string) => {
    trackEvent('form_submit', {
      form_name: formName,
      event_category: 'engagement',
      event_label: formName
    })
  }

  const trackButtonClick = (buttonName: string) => {
    trackEvent('click', {
      event_category: 'engagement',
      event_label: buttonName,
      button_name: buttonName
    })
  }

  const trackPageView = (pageName: string) => {
    trackEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href
    })
  }

  return {
    trackEvent,
    trackFormSubmission,
    trackButtonClick,
    trackPageView
  }
}

// Declare global types for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    lintrk: (...args: any[]) => void
    dataLayer: any[]
  }
}