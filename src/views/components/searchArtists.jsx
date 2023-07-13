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
        <ul className="items-center">
          {responseData.map((e, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  navigate(
                    `/play/${responseData[index].musicTitle}/${
                      responseData[index].artists
                    }/${encodeURIComponent(responseData[index].images.L)}/${
                      responseData[index].isrc
                    }`
                  );
                }}
              >
                <img src={e.images.S} alt="" />
                <p>
                  {e.musicTitle}:{e.artists}, url:{e.external_urls}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchArtists;
