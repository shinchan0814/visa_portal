import { useState } from 'react';
import CountryDetailPage from '../countryDetailPage';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';


export default function CountryPage({ initialData }) {
  const [countryData, setCountryData] = useState(initialData.countryData);
  const [faqs, setFaqs] = useState(initialData.faqs);
  const [documents, setDocuments] = useState(initialData.documents);
  const [aboutData, setAboutData] = useState(initialData.aboutData);
  const [processInfo, setProcessInfo] = useState(initialData.processInfo);

  if (!initialData.slug) {
    return (
      <>
        <Head>
          <title>Loading... | Visa by Saathi.app</title>
          <meta name="description" content="Loading visa information..." />
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Visa by Saathi.app - Get Visa for ${initialData.slug}`}</title>
        <meta name="description" content={`Apply for a visa to ${initialData.slug} with Saathi.app. Easy process.`} />
        <meta name="keywords" content={`${initialData.slug} visa, Indian passport, travel to ${initialData.slug}, visa application, Saathi.app`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://visa.saathi.app/country/${initialData.slug}`} />
        <meta property="og:title" content={`${initialData.slug} Visa Application - Saathi.app`} />
        <meta property="og:description" content={`Apply for your visa to ${initialData.slug}. Processing time is too less. Apply now with Saathi.app!`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://visa.saathi.app/country/${initialData.slug}`} />
        <meta property="twitter:title" content={`${initialData.slug} Visa Application - Saathi.app`} />
        <meta property="twitter:description" content={`Apply for your visa to ${initialData.slug}.Processing time is too less. Apply now with Saathi.app!`} />

        {/* Additional metadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Saathi.app" />
        <link rel="canonical" href={`https://visa.saathi.app/country/${initialData.slug}`} />

        {/* Schema.org markup for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAction",
            "name": `${initialData.slug} Visa Application`,
            "description": `Apply for a  visa to ${initialData.slug} with Saathi.app`,
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `https://visa.saathi.app/country/${initialData.slug}`,
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            },
            "result": {
              "@type": "VisaApplication",
              "name": `Get Visa for ${initialData.slug}`,
            }
          })}
        </script>
      </Head>
      <CountryDetailPage
        countryData={countryData}
        faqs={faqs}
        documents={documents}
        aboutData={aboutData}
        processInfo={processInfo}
        slug={initialData.slug}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    // Use fs to read the files from the file system
    const countriesDataPath = path.join(process.cwd(), 'public', 'data', 'FinalDataCountry.json');
    const visaInfoDataPath = path.join(process.cwd(), 'public', 'data', 'combined_visa_info.json');
    const faqsDataPath = path.join(process.cwd(), 'public', 'data', 'combined_faqs.json');
    const documentsDataPath = path.join(process.cwd(), 'public', 'data', 'combined_documents.json');
    const sectionsDataPath = path.join(process.cwd(), 'public', 'data', 'combined_sections.json');
    const processInfoDataPath = path.join(process.cwd(), 'public', 'data', 'All_Documents_Required.json');

    // Read the files
    const countriesData = JSON.parse(fs.readFileSync(countriesDataPath, 'utf8'));
    const visaInfoData = JSON.parse(fs.readFileSync(visaInfoDataPath, 'utf8'));
    const faqsData = JSON.parse(fs.readFileSync(faqsDataPath, 'utf8'));
    const documentsData = JSON.parse(fs.readFileSync(documentsDataPath, 'utf8'));
    const sectionsData = JSON.parse(fs.readFileSync(sectionsDataPath, 'utf8'));
    const processInfoData = JSON.parse(fs.readFileSync(processInfoDataPath, 'utf8'));

    const countryInfo = countriesData.find(country => country.slug === slug);
    const visaInfo = visaInfoData[slug];

    // Handle case where country or visa info is not found
    if (!countryInfo || !visaInfo) {
      return { notFound: true };
    }

    return {
      props: {
        initialData: {
          slug,
          countryData: { ...countryInfo, ...visaInfo },
          faqs: faqsData[slug] || [],
          documents: documentsData[slug] || [],
          aboutData: Array.isArray(sectionsData[slug]) ? sectionsData[slug] : [],
          processInfo: processInfoData[slug] || [],
        },
      },
    };
  } catch (error) {
    console.error('Failed to load data', error);
    return {
      props: {
        initialData: {
          slug,
          countryData: {},
          faqs: [],
          documents: [],
          aboutData: [],
          processInfo: [],
        },
      },
    };
  }
}