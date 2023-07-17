import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchArtists = (props) => {
  const navigate = useNavigate();
  const [musicTitle, setMusicTitle] = useState("");
  const [responseData, setResponseData] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.accessToken}`,
      "Accept-Language": "en",
    },
  };

  useEffect(() => {
    setMusicTitle(props.musicTitle);
  }, [props.musicTitle]);

  useEffect(() => {
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${props.musicTitle}&type=track&market=US&limit=3`,
        config
      )
      .then((res) => {
        if (res.data && res.data.tracks && res.data.tracks.items) {
          console.log(res);
          let data = res.data.tracks.items.map((e) => {
            return {
              musicTitle: e.name,
              artists: e.album.artists[0].name,
              images: {
                L: e.album.images[0].url,
                S: e.album.images[2].url,
              },
              external_urls: e.album.external_urls.spotify,
              isrc: e.external_ids.isrc,
            };
          });
          setResponseData(data);
        }
      });
  }, [musicTitle]);

  return (
    <>
      {responseData.length > 0 && (
        <ul className="items-center w-3/5 mx-auto">
          {responseData.map((e, index) => {
            return (
              <li
                className="flex items-center gap-6 p-2 rounded-md opacity-50 hover:bg-gray-200 hover:opacity-100"
                key={index}
                onClick={() => {
                  navigate(
                    `/play/${responseData[index].musicTitle}/${
                      responseData[index].artists
                    }/${encodeURIComponent(responseData[index].images.L)}/${
                      responseData[index].isrc
                    }/${encodeURIComponent(responseData[index].external_urls)}`
                  );
                }}
              >
                <img src={e.images.S} alt="" />
                <p>
                  <span className="text-xl font-bold">{e.musicTitle}</span> -{" "}
                  {e.artists}
                </p>
                <a
                  href={responseData[index].external_urls}
                  className="block p-2 text-right rounded-full hover:bg-gray-300"
                  target="_blank"
                >
                  <img
                    className="w-4 h-4"
                    src="gaibulink.png"
                    alt="外部リンク"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchArtists;
