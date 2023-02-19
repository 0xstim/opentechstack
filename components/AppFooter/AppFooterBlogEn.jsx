import Link from "next/link";
import Image from "next/image";

export default function AppFooterBlogEn() {

  return (
    <>
      <h3>
        Ping me <a href="https://t.me/zxstim">@zxstim</a>
      </h3>
      <span>
        <a href="https://github.com/0xstim">
          <Image
            src="/icons8-github.svg"
            alt="Github icon"
            width={30}
            height={30}
          />
        </a>
      </span>
      <span style={{ marginLeft: "5px" }}>
        <a href="https://twitter.com/0xstim">
          <Image
            src="/icons8-twitter.svg"
            alt="Twitter icon"
            width={30}
            height={30}
          />
        </a>
      </span>
      <span style={{ marginLeft: "5px" }}>
        <a href="https://t.me/zxstim">
          <Image
            src="/icons8-telegram.svg"
            alt="Telegram icon"
            width={30}
            height={30}
          />
        </a>
      </span>
      <span style={{ marginLeft: "5px" }}>
        <a href="https://www.youtube.com/@0xstim">
          <Image
            src="/icons8-youtube.svg"
            alt="Youtube icon"
            width={30}
            height={30}
          />
        </a>
      </span>
      <h4>
        <Link href="/0xstim">
          <a>🥷 About 0xStim</a>
        </Link>
      </h4>
      <h4>
        <a href="https://github.com/0xstim/next-defi-vn">✏️ Edit this site on Github</a>
      </h4>
      <h4>
        <Link href="/disclaimer">
          <a>ℹ️ Disclaimer</a>
        </Link>
      </h4>
      <h4>
        <Link href="/donate">
          <a>🙏 Support me</a>
        </Link>
      </h4>
      <br />
      <br />
    </>
  );
}
