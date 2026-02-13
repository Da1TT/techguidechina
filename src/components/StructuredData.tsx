import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data, null, 2)}
      </script>
    </Helmet>
  );
}

// 预定义的结构化数据生成器
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Tech Guide in China",
  "description": "Professional guidance for international visitors to China's leading IT and AI exhibitions",
  "url": "https://techguideinchina.com",
  "logo": "https://techguideinchina.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-10-XXXX-XXXX",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.linkedin.com/company/techguideinchina",
    "https://twitter.com/techguideinchina"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tech Guide in China",
  "description": "Exhibition guide and tour services in Beijing",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.9042",
    "longitude": "116.4074"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Beijing",
    "addressLocality": "Beijing",
    "addressCountry": "CN"
  },
  "areaServed": {
    "@type": "City",
    "name": "Beijing"
  },
  "priceRange": "$$$"
};

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const eventSchema = (exhibition: {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  startDate: Date;
  registrationLink: string;
}) => {
  const startDate = exhibition.startDate.toISOString();
  
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": exhibition.title,
    "description": exhibition.description,
    "startDate": startDate,
    "location": {
      "@type": "Place",
      "name": exhibition.location,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CN"
      }
    },
    "url": exhibition.registrationLink,
    "performer": {
      "@type": "Organization",
      "name": "Tech Guide in China"
    },
    "offers": {
      "@type": "Offer",
      "url": exhibition.registrationLink,
      "price": "0",
      "priceCurrency": "CNY",
      "availability": "https://schema.org/InStock"
    }
  };
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://techguideinchina.com${item.url}`
  }))
});
