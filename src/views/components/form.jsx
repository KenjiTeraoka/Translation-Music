import React from "react";
import { useState } from "react";

const AccessTokenForm = () => {
  const [musicTitle, setMusicTitle] = useState("");
  const handleMusicTitle = (e) => {
    setMusicTitle(e.target.value);
    console.log(musicTitle);
  };

  return (
    <form>
      <input
        onChange={(e) => handleMusicTitle(e)}
        type="text"
        value={musicTitle}
      />
      <button type="submit">送信</button>

      {musicTitle !== "" && <p>title: {musicTitle}</p>}
    </form>
  );
};

export default AccessTokenForm;
