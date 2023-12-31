import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET_ID;

const AccessToken = (props) => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getAccessToken = async () => {
      const basic = Buffer.from(`${clientId}:${clientSecret}`).toString(
        "base64"
      );

      const config = {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const data = new URLSearchParams({
        grant_type: "client_credentials",
      }).toString();

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          data,
          config
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("アクセストークンの取得エラー:", error);
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    console.log(accessToken);
    props.postAccessToken(accessToken);
  }, [accessToken]);

  return;
};

export default AccessToken;
