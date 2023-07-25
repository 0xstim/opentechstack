import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UpButton from "../../components/UpButton/UpButton";
import AppFooter from "../../components/AppFooter/AppFooter";
import HodlerPath from "../../components/StartPath/HodlerPath/HodlerPath";

export default function Hodler(props) {
  const { t } = useTranslation("hodler");
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
        <title>Hodler path</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="../defi.svg" />
        <meta name="description" content="Hodler path" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Hodler path" />
        <meta property="og:title" content="Hodler path" key="ogtitle" />
        <meta property="og:description" content="Hodler path" key="ogdesc" />
        <meta property="og:site_name" content="Hodler path" key="ogsitename" />
        <meta
          property="og:url"
          content="https://OpenTechStack.com/start/hodler"
          key="ogurl"
        />
      </Head>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Link href="/en/start" locale="en">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇬🇧</p>
              </a>
            </Link>
            <Link href="/start" locale="vi">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇻🇳</p>
              </a>
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/">{t("back")}</Link>
            <Link href="/start">{t("prev")}</Link>
          </div>
          <UpButton />
          <HodlerPath />
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "hodler"])),
      // Will be passed to the page component as props
    },
  };
}
