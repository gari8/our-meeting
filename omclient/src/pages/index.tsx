import {FC} from 'react'
import HeadInfo from "../components/atoms/HeadInfo";
import Layout from "../components/templates/Layout";
import Link from "next/link";
import {ColorMap} from "../models/resource";

const Home: FC = () =>  {
    return (
        <>
            <HeadInfo
                title={"TOP PAGE"}
                description={"TOP"}
                keyword={"BRAIN STORMING"}
                image={"/static/brst.svg"}
                url={"/"}
            />
            <Layout>
                <h1 className="title text-center text-5xl my-5">ブレストってなに？</h1>
                <div className="flex justify-center my-20">
                    <div className="w-1/3 m-10">
                        <img src="/static/brst.svg" />
                    </div>
                    <p className="description break-words text-white text-center text-md m-10 w-1/3 leading-relaxed">
                        brain storming とは何か？<br/>　ブレインストーミングという言葉を周りで聞いたことはあるだろうか？
                        会議などで用いられる、相手の意見を尊重しながらどんどん意見を出し合う手法である。
                        しかし、この有効な手法もコロナ禍におけるビデオ会議で行ってしまうと意見が入り乱れて場が収まらなくなってしまう。
                        <br/>そのため、テキストベースでリアルタイムに話し合いができるツールとしてこのサービスを立ち上げてみた。
                    </p>
                </div>
                <h2 className="navigator text-center text-2xl"><Link href="/brain-storming">＞早速使ってみる</Link></h2>
            </Layout>
            <style jsx>{`
                .description {
                    color: ${ColorMap.myWhite};
                }
                .navigator {
                    color: ${ColorMap.textMain};
                }
                .navigator:hover {
                    text-decoration-line: underline;
                }
                .title {
                    color: ${ColorMap.textSub};
                }
            `}</style>
        </>
    )
}

export default Home
