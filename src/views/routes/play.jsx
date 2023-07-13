import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MusixmatchServis from "../components/musixmatchServis";
import Translate from "../components/translate";

const Play = () => {
  const [lyric, setLyric] = useState("");
  const { musicTitle, artists, image, isrc } = useParams();

  const handleLyric = (newLyric) => {
    setLyric(newLyric);
  };

  useEffect(() => {}, [lyric]);
  return (
    <>
      <h1 className="mx-8 text-2xl font-bold">
        Japanese translation of the lyrics
      </h1>
      <div className="w-4/5 px-8 py-8 m-auto mb-8 bg-gray-300 border-12 rounded-xl">
        <div className="flex px-4 py-4 bg-gray-100 rounded-xl">
          <img src={image} alt="" className="w-1/4 rounded-xl" />
          <div className="px-10 py-10 text-left">
            <p className="py-2 text-5xl font-bold">{musicTitle}</p>
            <p className="">artist: {artists}</p>
          </div>
        </div>

        <p className="mx-6 my-4 text-2xl font-bold text-left">Lyric / 歌詞</p>

        <div className="flex p-6 bg-white rounded-xl">
          {/* <MusixmatchServis
            className=""
            isrc={isrc}
            handleLyric={handleLyric}
          /> */}

          {/* <div className="w-4/5">{lyric && <Translate lyric={lyric} />}</div> */}
        </div>
      </div>
    </>
  );
};

export default Play;
