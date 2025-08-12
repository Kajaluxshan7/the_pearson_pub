export const useSEO = () => {
  const config = useRuntimeConfig();

  const setSEO = (options: {
    title: string;
    description: string;
    ogImage?: string;
    ogType?: string;
    canonical?: string;
    structuredData?: any;
    noIndex?: boolean;
  }) => {
    const {
      title,
      description,
      ogImage,
      ogType = "website",
      canonical,
      structuredData,
      noIndex = false,
    } = options;

    const fullTitle = title.includes("The Pearson Pub")
      ? title
      : `${title} | The Pearson Pub`;
    const url = canonical || `${config.public.siteUrl}${useRoute().path}`;
    const image =
      ogImage || `${config.public.siteUrl}/images/pub/interior-main.jpg`;

    useHead({
      title: fullTitle,
      meta: [
        { name: "description", content: description },
        {
          name: "robots",
          content: noIndex ? "noindex,nofollow" : "index,follow",
        },

        // Open Graph
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: ogType },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:site_name", content: "The Pearson Pub" },
        { property: "og:locale", content: "en_CA" },

        // Twitter Cards
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: fullTitle },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },

        // Local Business
        { name: "geo.region", content: "CA-ON" },
        { name: "geo.placename", content: "Whitby" },
        { name: "geo.position", content: "43.8755;-78.9439" },
      ],
      link: [{ rel: "canonical", href: url }],
      script: structuredData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(structuredData),
            },
          ]
        : [],
    });
  };

  const getLocalBusinessSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "The Pearson Pub",
      description:
        "A traditional pub atmosphere with modern amenities in Whitby",
      url: config.public.siteUrl,
      telephone: "905-430-5699",
      email: "thepearsonpub@rogers.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "101 Mary St",
        addressLocality: "Whitby",
        addressRegion: "ON",
        postalCode: "L1N 2R4",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "43.8755",
        longitude: "-78.9439",
      },
      openingHours: ["Mo-Su 11:00-02:00"],
      servesCuisine: ["British", "Canadian", "Pub Food"],
      priceRange: "$$",
      image: `${config.public.siteUrl}/images/pub/interior-main.jpg`,
      logo: `${config.public.siteUrl}/pearson-pub-logo.png`,
      sameAs: [
        "https://www.facebook.com/thepearsonpub",
        "https://www.instagram.com/thepearsonpub",
        "https://www.tiktok.com/@the.pearson.pub6",
      ],
    };
  };

  return {
    setSEO,
    getLocalBusinessSchema,
  };
};
