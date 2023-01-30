import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../components/UpButton/UpButton";
import HowToBot from "../components/BotTrading/HowToBot/HowToBot";
import AppFooter from "../components/AppFooter/AppFooter";


export default function Bot(props) {
  const { t } = useTranslation("bot");

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
        <title>Learn how to setup trading bot | Học cách thiết lập bot trade - DeFi.vn</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="../defi.svg" />
        <meta name="description" content="Learn how to setup trading bot, from coding languages, server setup, recommendations to open source options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="DeFi.vn - Learn how to setup trading bot | Học cách thiết lập bot trade" key="ogtitle" />
        <meta property="og:description" content="Learn how to setup trading bot, from coding languages, server setup, recommendations to open source options." key="ogdesc" />
        <meta property="og:url" content="https://defi.vn/bot" key="ogurl" />
        <meta property="og:site_name" content="DeFi.vn | DeFi Vietnam Hub" key="ogsitename" />
      </Head>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Link href="/bot" locale="en">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇬🇧</p>
              </a>
            </Link>
            <Link href="/bot" locale="vi">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇻🇳</p>
              </a>
            </Link>
          </div>
          <Link href="/">{t("back")}</Link>
          <UpButton />
          <HowToBot />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

// This gets called on every request
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "bot"])),
      // Will be passed to the page component as props
    },
  };
}