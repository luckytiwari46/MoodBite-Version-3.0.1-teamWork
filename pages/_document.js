import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const logoUrl = "https://media.licdn.com/dms/image/v2/D4D0BAQFbPzrKNUtwrQ/company-logo_200_200/B4DZb8UJvqG0AM-/0/1747989863756?e=2147483647&v=beta&t=-9uS2xtqeLNuM6SzG2CeDjuKpW9pvppUhAC_eUHXMjw";

  return (
    <Html lang="en" className="h-full">
      <Head>
        <link rel="icon" href={logoUrl} />
        <title>MoodBite.Ai - Mood-Based Food Recommendations</title>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

