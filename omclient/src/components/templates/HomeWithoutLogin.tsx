import {FC} from "react";
import {ColorMap} from "../../models/resource";

interface Props {
    handleSignIn: () => void
}

const HomeWithoutLogin: FC<Props> = ({ handleSignIn }) => {
    return (
        <>
            <h1 className="title text-center text-5xl my-5">ブレストってなに？</h1>
            <div className="flex justify-center my-20">
                <div className="w-1/3 m-10">
                    <img src="/static/brst.svg" />
                </div>
                <p className="description break-words text-white text-center text-md m-10 w-1/3 leading-relaxed">
                    brain storming とは何か<br/>　ブレインストーミングという言葉を周りで聞いたことはあるだろうか？
                    会議などで用いられる、相手の意見を尊重しながらどんどん意見を出し合う手法である。
                    しかし、この有効な手法もコロナ禍におけるビデオ会議で行ってしまうと意見が入り乱れて場が収まらなくなってしまう。
                    <br/>そこで、テキストベースでリアルタイムに話し合いができるツールとしてこのサービスを立ち上げてみた。
                </p>
            </div>
            <h2
                className="navigator text-center text-2xl"
                onClick={() => {
                    handleSignIn()
                }}
            >＞早速使ってみる</h2>
            <style jsx>{`
                .description {
                    color: ${ColorMap.textMain};
                }
                .navigator {
                    color: ${ColorMap.textMain};
                }
                .navigator:hover {
                    text-decoration-line: underline;
                }
                .title {
                    color: ${ColorMap.textMain};
                }
            `}</style>
        </>
    )
}

export default HomeWithoutLogin;