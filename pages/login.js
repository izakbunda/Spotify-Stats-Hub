import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import querystring from "querystring";
import { generateChallenge } from "../utils/pkce";

const CLIENT_ID = "f64a28bcb3584d81b60cfc4390dedf1a";
const CALLBACK_URL = "http://localhost:3000";
const SPOTIFY_CODE_VERIFIER = "spotify-code-verifier";

export default function login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authCode, setAuthCode] = useState();
  const [accessToken, setAccessToken] = useState();
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const code = router.query.code;
    if (!code) return;
    setAuthCode(code);
  }, [router]);

  useEffect(() => {
    if (authCode) void getAccessToken();
  }, [authCode]);

  useEffect(() => {
    if (accessToken) setLoggedIn(true);
  }, [accessToken]);

  //   useEffect(() => {
  //     if (loggedIn) router.push("/landing");
  //   }, []);

  const login = async () => {
    const { code_challenge, code_verifier } = await generateChallenge();
    window.localStorage.setItem(SPOTIFY_CODE_VERIFIER, code_verifier);
    const authenticationUrl =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: "user-top-read",
        redirect_uri: CALLBACK_URL,
        show_dialog: true,
        code_challenge_method: "S256",
        code_challenge,
      });
    void router.push(authenticationUrl);
  };

  const getAccessToken = async () => {
    const code_verifier = window.localStorage.getItem(SPOTIFY_CODE_VERIFIER);
    if (!code_verifier) return;

    const res = await window.fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
      },
      body: querystring.stringify({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        redirect_uri: CALLBACK_URL, // this url just needs to match the one used when getting the authorization token
        code: authCode,
        code_verifier,
      }),
    });

    const body = await res.json();
    setAccessToken(body.access_token);
  };
}
