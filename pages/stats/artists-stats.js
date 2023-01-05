import { useState, useEffect } from "react";
import querystring from "querystring";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { freemem } from "os";

const Duration = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
};
Object.freeze(Duration);

export default function songsStats() {
  const [select, setSelect] = useState(false);
  const [topArtists, setTopArtists] = useState([]);
  const [interval, setInterval] = useState();

  const router = useRouter();

  const [accessToken, setAccessToken] = useState();
  const ACCESS_TOKEN = "access-token";

  useEffect(() => {
    const token = window.localStorage.getItem(ACCESS_TOKEN);
    setAccessToken(token);
  }, []);

  const fetchTopArtists = async (duration) => {
    const response = await window.fetch(
      "https://api.spotify.com/v1/me/top/artists?" +
        querystring.stringify({
          limit: 50,
          offset: 0,
          time_range: duration,
        }),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await response.json();
    setTopArtists(data.items.map((artist) => artist.name));
  };

  const showTopArtists = topArtists.map((artist, idx) => (
    <li key={idx} className={styles.listItem}>
      {idx + 1}. {artist}
    </li>
  ));

  const handleClick = (e, path) => {
    e.preventDefault();

    if (path === "/stats-landing") {
      router.push("/stats-landing");
    }
  };

  return !select ? (
    <div className={styles.main}>
      <div className={styles.grid}>
        <h2 className={styles.title}>View Your Top 10 Artists &#127897;</h2>
      </div>
      <div
        className={`${styles.grid} ${styles.select}`}
        onClick={() => {
          fetchTopArtists(Duration.SHORT_TERM);
          setSelect(true);
          setInterval("Top Artists From The Past Four Weeks");
        }}
      >
        <h1>Last 4 Weeks</h1>
      </div>
      <div
        className={`${styles.grid} ${styles.select}`}
        onClick={() => {
          fetchTopArtists(Duration.MEDIUM_TERM);
          setSelect(true);
          setInterval("Top Artists From The Past Six Months");
        }}
      >
        <h1>Last 6 months</h1>
      </div>
      <div
        className={`${styles.grid} ${styles.select}`}
        onClick={() => {
          fetchTopArtists(Duration.LONG_TERM);
          setSelect(true);
          setInterval("Your Top Artists Of All Time");
        }}
      >
        <h1>All Time</h1>
      </div>

      <div className={styles.back}>
        <a onClick={(e) => handleClick(e, "/stats-landing")}>
          <h1>&#8592; &#8592; Go back </h1>
        </a>
      </div>
      <footer className={styles.footer}>
        <a href="/about">About Spotify Stats Hub</a>
      </footer>
    </div>
  ) : (
    topArtists.length > 0 && (
      <main className={styles.main}>
        <div className={styles.column2}>
          <h1> {interval} </h1>

          <ul className={styles.topSongs}>{showTopArtists}</ul>
        </div>

        <div className={styles.back}>
          <a onClick={(e) => handleClick(e, "/stats-landing")}>
            <h1>&#8592; &#8592; Go back </h1>
          </a>
        </div>
        <footer className={styles.footer}>
          <a href="/about">About Spotify Stats Hub</a>
        </footer>
      </main>
    )
  );
}
