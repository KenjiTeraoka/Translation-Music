import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Translate = (props) => {
  const [message, setMessage] = useState("");
  const [fixedLyric, setFixedLyric] = useState([]);

  const configuration = new Configuration({
    apiKey: process.env.CHATGPT_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const postLyric = async (lyric) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "英語の歌詞を日本語に翻訳して下さい。" },
          { role: "user", content: lyric },
        ],
      });
      setMessage(response.data.choices[0].message.content);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  const testLyric =
    "Durkio told me he been on some positive shit, yeah, yeah Lately, I just wanna show up and body some shit, yeah, yeah Always been a lil' mathematician, lately, it's cash I'm gettin' Got me losin' count of these bags, I've been movin' too fast Hard times don't last, 'member when cops harassed?";

  const JpLyric =
    "ダーキオは最近ポジティブなことばかり言っていて、そうだ、そうだ 最近、ただ現れて何かしらを成し遂げたいんだ、そうだ、そうだ ずっと小さい頃から数学好きだったけど、最近はキャッシュを手に入れてるんだ バッグの数を数えるのも忙しくて、あまりにも速すぎるんだ 苦しい時期は続かない、警察につままれることを覚えてるかい？";

  useEffect(() => {
    // postLyric(props.lyric);
    setMessage(JpLyric);
  }, [props.lyric]);

  useEffect(() => {
    // console.log("message", message);
    const fixedLyric = message.split(" ");
    // console.log("fixedLyric", fixedLyric);
    setFixedLyric(fixedLyric);
  }, [message]);

  return (
    <div className="pl-3 text-left">
      {fixedLyric.map((e, index) => {
        return <p key={index}>{e}</p>;
      })}
    </div>
  );
};

export default Translate;
