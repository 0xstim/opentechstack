import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function StartPath() {
  const router = useRouter();
  const startPaths = [
    {
        id: 1,
        name: "Holder",
        web: "holder",
        desc: "You want to achieve enlightenment, the diamond hands status. If you treasure your sanity, pick this path. Don't be shy! This is the most popular path.",
        descVi: "Bạn mong được khai sáng, đạt được danh hiệu bàn tay kim cương. Nếu bạn muốn nhẹ nhõm đầu óc, hãy chọn con đường này. Đừng lo lắng! Đây là con đường mà ai cũng trải qua.",
        imgPath: "/hodl.svg"
    },
    {
        id: 2,
        name: "Pro",
        web: "pro",
        desc: "You want to reach higher, take advantage of all possible yield opportunities, and make the most of your crypto. This is the path for you.",
        descVi: "Bạn muốn vươn cao hơn, tận dụng tất cả các cơ hội sinh lời, và tận dụng tối đa crypto của mình. Đây là con đường dành cho bạn.",
        imgPath: "/pro.svg"
    },
    {
        id: 3,
        name: "Builder",
        web: "builder",
        desc: "You are ambitious, you want to build your own crypto project, you want to shape the market and the future of the industry. Pain is temporary, glory is forever. Join the revolution comrades!",
        descVi: "Bạn có đam mê mãnh liệt, bạn muốn xây dựng dự án crypto của riêng mình, bạn muốn định hình thị trường và tương lai của ngành. Đau đớn là tạm thời, danh tiếng là mãi mãi. Hãy tham gia cuộc cách mạng đồng chí ơi!",
        imgPath: "/buidler.svg"
    },
    {
        id: 4,
        name: "Degen",
        web: "degen",
        desc: "You are a natural born dare devil, you want to take risks, you want to make money fast. You want the lambo, the gold chains, bottle service at the club. You are a true degenerate. Welcome to the dark side!",
        descVi: "Bạn là một người thích mạo hiểm, bạn muốn chơi thử nghiệm, bạn muốn kiếm tiền nhanh. Bạn muốn xe lambo, xích vàng, dịch vụ vip tại club. Bạn là một degen thực thụ. Chào mừng bạn đến với thế giới đen tối!",
        imgPath: "/degen.svg"
    },
    {
        id: 5,
        name: "Quant Bro",
        web: "quant-bro",
        desc: "You are a math geek. You want to find the perfect arbitrage opportunities. The term MEV turns you on like nothing else. All you want to talk about is TA, yield farming, liquidity mining, and the latest DeFi protocols. Read on my friend, read on.",
        descVi: "Bạn là một người đam mê toán học. Bạn muốn tìm các cơ hội kinh doanh chênh lệch giá hoàn hảo. Thuật ngữ MEV khiến bạn bật như không có gì khác. Tất cả những gì bạn muốn nói là TA, canh tác năng suất, khai thác thanh khoản và các giao thức DeFi mới nhất. Đọc tiếp đi bạn của tôi ơi, hãy đọc tiếp.",
        imgPath: "/quantbro.svg"
    },
    {
        id: 6,
        name: "Meme Lord",
        web: "meme-lord",
        desc: "You want to gain clout on Crypto Twitter. You want to create the most legendary shit posts. You want your work to be featured on knowyourmeme. One tweet and the market moves the way you want it to. Please enter the meme zone, milord.",
        descVi: "Bạn muốn đú fame trên Twitter Crypto. Bạn muốn tạo ra những bài viết vô cùng hài hước. Bạn muốn meme của mình được đăng trên knowyourmeme. Một tweet của bạn và thị trường sẽ di chuyển theo ý muốn. Mời ngài vào khu vực meme, đại đế.",
        imgPath: "/memelord.svg"
    }
  ]

  return (
    <div className="start-path-container">
      {startPaths.map((startPath) => (
        <div key={startPath.id} className="start-path-item">
          <Link href={`start/${startPath.web}`} style={{ textDecoration: "none", color: "#000000" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Image
                src={startPath.imgPath}
                alt="path img"
                width={200}
                height={200}
              />
            </div>
            <div className="start-path-name">{startPath.name}</div>
            <div className="start-path-desc">
              {router.locale === "en" ? startPath.desc : startPath.descVi}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
