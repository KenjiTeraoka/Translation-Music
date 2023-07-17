import React, { useEffect, useState } from "react";
import axios from "axios";

const MusixmatchServis = (props) => {
  const [id, setId] = useState(0);
  const [lyric, setLyric] = useState("");
  const [fixedLyric, setFixedLyric] = useState([]);
  const [copyRight, setCopyRight] = useState("");

  const musixMatchApi = process.env.REACT_APP_MUSIXMATCH_API_KEY;

  useEffect(() => {
    axios
      .get("http://api.musixmatch.com/ws/1.1/track.get", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          track_isrc: props.isrc,
          apikey: musixMatchApi,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.message.body.length !== 0) {
          let getid = res.data.message.body.track.commontrack_id;
          setId(getid);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${id}&apikey=${musixMatchApi}`
      )
      .then((res) => {
        if (res.data.message.body.length !== 0) {
          console.log(res);
          const getLyric = res.data.message.body.lyrics.lyrics_body;
          setCopyRight(res.data.message.body.lyrics.lyrics_copyright);
          const trimmedLyric = getLyric.split("...")[0].trim();
          setLyric(trimmedLyric);
        }
      });
  }, [id]);

  useEffect(() => {
    const splitLyric = lyric.split("\n");
    const fixedLyric = splitLyric.map((e) => {
      if (e === "") {
        return (e = "\n");
      } else {
        return e;
      }
    });
    // console.log(fixedLyric);
    setFixedLyric(fixedLyric);
    props.handleLyric(lyric);
  }, [lyric, props.handleLyric]);

  return (
    <div className="w-4/5 pr-3 text-left whitespace-pre-line border-r border-dashed">
      {fixedLyric.map((e, index) => {
        return <p key={index}>{e}</p>;
      })}

      <p className="text-xs text-gray-400 pt-14">{copyRight}</p>
    </div>
  );
};

export default MusixmatchServis;
