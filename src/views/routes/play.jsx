import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MusixmatchServis from "../components/musixmatchServis";
import Translate from "../components/translate";

const Play = () => {
  const [lyric, setLyric] = useState("");
  const { musicTitle, artists, image, isrc, spotifyurl } = useParams();

  const handleLyric = (newLyric) => {
    setLyric(newLyric);
  };

  useEffect(() => {}, [lyric]);
  return (
    <>
      <div className="w-4/5 px-8 py-8 mx-auto mt-4 mb-8 bg-gray-300 border-12 rounded-3xl">
        <div className="relative flex px-4 py-4 bg-gray-100 rounded-3xl">
          <img src={image} alt="" className="w-1/4 rounded-xl" />
          <div className="px-10 py-10 text-left ">
            <p className="py-2 text-6xl font-bold">{musicTitle}</p>
            <p className="">artist: {artists}</p>
            <a
              href={spotifyurl}
              target="_blank"
              className="absolute bloch right-14 bottom-8 hover:opacity-30"
            >
              <img className="w-6 h-6 " src="/gaibulink.png" alt="外部リンク" />
            </a>
          </div>
        </div>

        <div className="p-6 mt-8 bg-white rounded-3xl">
          <p className="my-4 text-sm font-bold text-left">
            Lyric / <span className="text-japn-color">歌詞</span>
          </p>
          <div className="flex">
            <MusixmatchServis
              className=""
              isrc={isrc}
              handleLyric={handleLyric}
            />

            {/* <div className="w-4/5">{lyric && <Translate lyric={lyric} />}</div> */}
          </div>
        </div>
      </div>

      <h1 className="my-16 text-xl font-bold">
        <span className="text-japn-color">Japanese</span> translation of the
        lyrics
      </h1>
    </>
  );
};

export default Play;
