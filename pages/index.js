import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ForYou from "../components/HomePage/ForYou/ForYou";
import ForDevelopers from "../components/HomePage/ForDevelopers/ForDevelopers";
import ForEveryone from "../components/HomePage/ForEveryone/ForEveryone";
import ForProjects from "../components/HomePage/ForProjects/ForProjects";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import AppFooter from "../components/AppFooter/AppFooter";
import { fetchStrapiAPI } from "../lib/api";

export default function Home(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-B3Z17PVC6F"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-B3Z17PVC6F');
          `}
      </Script>
      <Head>
        <title>OpenTechStack.com - Explore everything about the modern tech stack</title>
        <meta name="description" content="OpenTechStack.com is a community project aiming to be an open Web3 resource hub for everyone"/>
        <meta charSet="utf-8" />
        <link rel="icon" href="../opentechstack.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="https://www.OpenTechStack.com" />
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="OpenTechStack.com - DeFi Vietnam | DeFi Việt Nam" />
        <meta property="og:description" content="OpenTechStack.com is a community project aiming to be an open Web3 resource hub for everyone" />
        <meta property="og:image" content="https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/8d6a2d48-99bc-485c-4afc-239196f02200/defi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="OpenTechStack.com" />
        <meta property="twitter:url" content="https://www.OpenTechStack.com" />
        <meta name="twitter:title" content="OpenTechStack.com - DeFi Vietnam | DeFi Việt Nam" />
        <meta name="twitter:description" content="OpenTechStack.com is a community project aiming to be an open Web3 resource hub for everyone" />
        <meta name="twitter:image" content="https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/8d6a2d48-99bc-485c-4afc-239196f02200/defi" />
      </Head>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div className="subtitle">{t("subtitle")}</div>
          <LanguageSelector />
          <ForYou />
          <ForDevelopers />
          <ForProjects />
          <ForEveryone />
          <br />
          <hr />
          <AppFooter />
          <br />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  
  // const announcementsRes = await fetchStrapiAPI("/announcements", { populate: ["image"] })

  return {
    props: {
      // announcements: announcementsRes.data,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
