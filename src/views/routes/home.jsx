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
      <h1 className="pt-20 pb-6 text-6xl font-bold">
        <span className="text-japn-color">Japanese</span> translation of the
        lyrics
      </h1>
      <p className="text-sm text-gray-600 mb-14">海外の音楽を日本語に</p>

      <AccessToken postAccessToken={postAccessToken} />

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleMusicTitle(e)}
          type="text"
          value={musicTitle}
          placeholder="曲のタイトルを入力して下さい"
          className="w-3/5 px-4 py-4 border-2 rounded-2xl placeholder:text-sm focus:border-japn-color focus:outline-none focus:ring-0"
        />
      </form>

      {accessToken && musicTitle && (
        <SearchArtists
          accessToken={accessToken}
          musicTitle={musicTitle}
          className="flex"
        />
      )}
    </>
  );
};

export default Home;
