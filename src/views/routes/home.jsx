import React, { useEffect, useState } from "react";
import AccessToken from "../components/accesstoken";
import SearchArtists from "../components/searchArtists";

const Home = () => {
  const [musicTitle, setMusicTitle] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleMusicTitle = (e) => {
    setMusicTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const postAccessToken = (post) => {
    setAccessToken(post);
  };

  return (
    <>
      <h1 className="py-20 text-4xl font-bold">
        Japanese translation of the lyrics
      </h1>
      {/* <AccessToken postAccessToken={postAccessToken} /> */}

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleMusicTitle(e)}
          type="text"
          value={musicTitle}
          placeholder="曲のタイトルを入力して下さい"
          className="w-4/5 px-4 py-2 border rounded-md placeholder:text-xs"
        />
      </form>

      {/* {accessToken && musicTitle && (
        <SearchArtists
          accessToken={accessToken}
          musicTitle={musicTitle}
          className="flex"
        />
      )} */}
    </>
  );
};

export default Home;
