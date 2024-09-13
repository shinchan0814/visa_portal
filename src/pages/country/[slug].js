import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CountryDetailPage from '../countryDetailPage';
import Head from 'next/head';

export default function CountryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [countryData, setCountryData] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [processInfo, setProcessInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError('No country specified');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [countriesResponse, visaInfoResponse, faqsResponse, documentsResponse, sectionsResponse, processInfoResponse] = await Promise.all([
          fetch('/data/FinalDataCountry.json'),
          fetch('/data/combined_visa_info.json'),
          fetch('/data/combined_faqs.json'),
          fetch('/data/combined_documents.json'),
          fetch('/data/combined_sections.json'),
          fetch('/data/All_Documents_Required.json')
        ]);

        const [countriesData, visaInfoData, faqsData, documentsData, sectionsData, processInfoData] = await Promise.all([
          countriesResponse.json(),
          visaInfoResponse.json(),
          faqsResponse.json(),
          documentsResponse.json(),
          sectionsResponse.json(),
          processInfoResponse.json()
        ]);

        console.log('Fetched country data:', countriesData);
        console.log('Fetched visa info:', visaInfoData);

        const countryInfo = countriesData.find(country => country.slug === slug);
        const visaInfo = visaInfoData[slug];

        if (countryInfo && visaInfo) {
          setCountryData({ ...countryInfo, ...visaInfo });
        } else {
          setError('Country data or visa info is missing');
        }

        setFaqs(faqsData[slug] || []);
        setDocuments(documentsData[slug] || []);
        setAboutData(Array.isArray(sectionsData[slug]) ? sectionsData[slug] : []);
        setProcessInfo(processInfoData[slug] || []);
      } catch (error) {
        console.error('Failed to load data', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (!slug) {
    return (
      <>
        <Head>
          <title>{`Visa by Saathi.app - Get Visa for ${countryData.countryName}`}</title>
          <meta name="description" content={`Apply for a ${countryData.visaType} visa to ${countryData.countryName} with Saathi.app. Easy process, ${countryData.visaTimeline} processing. Price: ${countryData.Price}.`} />
          <meta name="keywords" content={`${countryData.countryName} visa, ${countryData.visaType}, Indian passport, travel to ${countryData.countryName}, visa application, Saathi.app`} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://visa.saathi.app/country/${slug}`} />
          <meta property="og:title" content={`${countryData.countryName} Visa Application - Saathi.app`} />
          <meta property="og:description" content={`Apply for your ${countryData.visaType} visa to ${countryData.countryName}. Processing time: ${countryData.visaTimeline}. Apply now with Saathi.app!`} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={`https://visa.saathi.app/country/${slug}`} />
          <meta property="twitter:title" content={`${countryData.countryName} Visa Application - Saathi.app`} />
          <meta property="twitter:description" content={`Apply for your ${countryData.visaType} visa to ${countryData.countryName}. Processing time: ${countryData.visaTimeline}. Apply now with Saathi.app!`} />

          {/* Additional metadata */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Saathi.app" />
          <link rel="canonical" href={`https://visa.saathi.app/country/${slug}`} />

          {/* Schema.org markup for Google */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAction",
              "name": `${countryData.countryName} Visa Application`,
              "description": `Apply for a ${countryData.visaType} visa to ${countryData.countryName} with Saathi.app`,
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `https://visa.saathi.app/country/${slug}`,
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              },
              "result": {
                "@type": "VisaApplication",
                "name": `${countryData.visaType} for ${countryData.countryName}`,
                "processingTime": countryData.visaTimeline,
                "price": countryData.Price
              }
            })}
          </script>
        </Head>
        <div>Loading...</div>
      </>
    )
  }

  return <CountryDetailPage slug={slug} />;
}