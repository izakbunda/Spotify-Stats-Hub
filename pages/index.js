import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import querystring from "querystring";
import { generateChallenge } from "../utils/pkce";

const CLIENT_ID = "f64a28bcb3584d81b60cfc4390dedf1a";
const CALLBACK_URL = "http://localhost:3000";
const SPOTIFY_CODE_VERIFIER = "spotify-code-verifier";
const ACCESS_TOKEN = "access-token";

const Duration = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
};
Object.freeze(Duration);

export default function Home() {
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

  useEffect(() => {
    if (loggedIn) router.push("/landing");
  }, []);

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

  return (
    <div className={styles.container}>
      <Head>
        <title> Spotify Stats Hub</title>
      </Head>

      <main className={styles.main}>
        {!loggedIn ? (
          <div className={styles.grid}>
            <h1 className={styles.title}>Spotify Stats Hub &#128187;</h1>

            <p className={styles.description}>
              Find out how you listen to music and more!
            </p>

            <div className={styles.card} onClick={login}>
              <h3>Login with Spotify</h3>
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            <h3 className={styles.description}>Login Successful!</h3>
            <div className={styles.card}>
              <h3>
                <a
                  href="/landing"
                  className={styles.card}
                  onClick={() =>
                    window.localStorage.setItem(ACCESS_TOKEN, accessToken)
                  }
                >
                  Enter
                </a>
              </h3>
            </div>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <a href="/about">About Spotify Stats Hub</a>
      </footer>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
