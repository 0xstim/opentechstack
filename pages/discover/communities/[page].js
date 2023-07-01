import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import FloatingButton from "../../../components/FloatingButton/FloatingButton"
import AppFooter from "../../../components/AppFooter/AppFooter";
import CommunitiesList from "../../../components/DiscoverList/CommunitiesList/CommunitiesList";
import { fetchStrapiAPI } from "../../../lib/api";

export default function Communities({ communities, pagination, communityCategories }) {
  const { t } = useTranslation("communities");
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
        <title>Find your communities | Tìm cộng đồng của bạn - DeFi.vn</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="../defi.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Find your communities | Tìm cộng đồng của bạn - DeFi.vn" />
        <meta property="og:description" content="Find out about many global communities, what they discuss about and notable figures in the crypto industry." />
        <meta property="og:url" content="https://defi.vn/communities" />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/917efcc6-7c1c-493f-7d64-eb7e85cd2c00/defi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="defi.vn" />
        <meta property="twitter:url" content="https://www.defi.vn/communities" />
        <meta name="twitter:title" content="Find your communities | Tìm cộng đồng của bạn - DeFi.vn" />
        <meta name="twitter:description" content="Find out about many global communities, what they discuss about and notable figures in the crypto industry." />
        <meta name="twitter:image" content="https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/917efcc6-7c1c-493f-7d64-eb7e85cd2c00/defi" />
      </Head>
      <div className="App">
        <div className="markdown-body">
          <h1 id="top">{t("title")}</h1>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Link href="/discover/communities" locale="en">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇬🇧</p>
              </a>
            </Link>
            <Link href="/discover/communities" locale="vi">
              <a style={{ textDecoration: "none" }}>
                <p className="i18n-button">🇻🇳</p>
              </a>
            </Link>
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px",  
            width: "fit-content"
            }}>
            <Link href="/">{t("back")}</Link>
            <Link href="/discover">{t("prev")}</Link>
          </div>
          <FloatingButton />
          <h2>{t("subtitle")}</h2>
          <CommunitiesList communities={communities} pagination={pagination} communityCategories={communityCategories}/>
          <br />
          <hr />
          <AppFooter />
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {

  const communityCategoriesRes = await fetchStrapiAPI("/community-categories", {
    locale: "all",
    sort: "name:asc",
  })
  const communitiesRes = await fetchStrapiAPI("/communities", {
    fields: [
      "name", 
      "social", 
      "updatedAt", 
      "slug", 
      "locale"
    ],   
    populate: {
      logo: "*",
      community_categories: {
        fields: ["name", "slug", "locale"],
        sort: ["name:asc"],
      }
    },
    locale: "all", 
    pagination: {
      page: context.query.page,
      pageSize: 60,
    },
	  sort: "name:asc",
  })

  return {
    props: {
      communities: communitiesRes.data,
      pagination: communitiesRes.meta.pagination,
      communityCategories: communityCategoriesRes.data,
      ...(await serverSideTranslations(context.locale, ["common", "communities"])),
      // Will be passed to the page component as props
    },
  };
}