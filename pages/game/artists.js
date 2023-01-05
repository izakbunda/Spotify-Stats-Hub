import { useState, useEffect } from "react";
import querystring from "querystring";
import styles from "../../styles/Home.module.css";
import { getNumber, getRandomInt } from "../utils";
import { useRouter } from "next/router";

const Duration = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
};
Object.freeze(Duration);

export default function artists() {
  const [revealed, setRevealed] = useState([]);
  const [curGuess, setCurGuess] = useState(0);
  const [curSongs, setCurSongs] = useState([]);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [topArtists, setTopArtists] = useState([]);
  const [select, setSelect] = useState(false);

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
          limit: 10,
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

  const showTopArtists = topArtists.map((artist, idx) =>
    revealed[idx] ? (
      <li key={idx} className={styles.listItem}>
        {idx + 1}. {artist}
      </li>
    ) : (
      <li key={idx} className={styles.listItem}>
        {idx + 1}. ???
      </li>
    )
  );

  const reset = () => {
    setRevealed([]);
    setCurGuess(0);
    setCurSongs([]);
    setTotalGuesses(0);
  };

  // pass topArtists as dependency if I want to reset it after finishing the game
  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (curSongs.length == 0 && topArtists.length > 0 && curGuess == 0) {
      generateGuesses(curGuess);
    }
  }, [curSongs, topArtists]);

  const generateGuesses = (curGuessNum) => {
    const tempSongs = [];
    const size = Math.min(4, topArtists.length - curGuessNum);
    const answerIdx = getRandomInt(0, size);

    for (let i = 0; i < size; i++) {
      if (i === answerIdx) {
        tempSongs.push(topArtists[curGuessNum]);
      } else {
        var randomSong;
        do {
          randomSong =
            topArtists[getRandomInt(curGuessNum + 1, topArtists.length)];
        } while (tempSongs.includes(randomSong));

        tempSongs.push(randomSong);
      }
    }

    setCurSongs(tempSongs);
  };

  const reveal = (guess) => {
    setTotalGuesses(totalGuesses + 1);
    if (guess === topArtists[curGuess]) {
      const newRevealed = [...revealed];
      newRevealed[curGuess] = true;

      setRevealed(newRevealed);
      setCurGuess(curGuess + 1);
      generateGuesses(curGuess + 1);
    }
  };

  const handleClick = (e, path) => {
    e.preventDefault();

    if (path === "/game/songs-or-artists") {
      router.push("/game/songs-or-artists");
    }
  };

  return !select ? (
    <div className={styles.main}>
      <div className={styles.grid}>
        <h2 className={styles.title}>Guess Your Top 10 Artists</h2>
      </div>
      <div
        className={`${styles.grid} ${styles.select}`}
        onClick={() => {
          fetchTopArtists(Duration.SHORT_TERM);
          setSelect(true);
        }}
      >
        <h1>Last 4 Weeks</h1>
      </div>
      <div
        className={`${styles.grid} ${styles.select}`}
        onClick={() => {
          fetchTopArtists(Duration.MEDIUM_TERM);
          setSelect(true);
        }}
      >
        <h1>Last 6 months</h1>
      </div>
      <div
        className={`${styles.grid} ${styles.select}`}
        onClick={() => {
          fetchTopArtists(Duration.LONG_TERM);
          setSelect(true);
        }}
      >
        <h1>All Time</h1>
      </div>

      <div className={styles.back}>
        <a onClick={(e) => handleClick(e, "/game/songs-or-artists")}>
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
        <div className={styles.grid2}>
          <div className={styles.column}>
            {totalGuesses === 0 ? (
              <h1>Correctness: 100%</h1>
            ) : (
              <h1>
                Correctness: {Math.round((curGuess / totalGuesses) * 100)}&#x25;
              </h1>
            )}
            <ul className={styles.topSongs}>{showTopArtists}</ul>
          </div>
          <div className={styles.column}>
            {curGuess < topArtists.length && (
              <h1>Guess Your {getNumber(curGuess)} Top Song</h1>
            )}
            <div className={styles.grid2}>
              {curSongs.map((song, i) => (
                <div
                  key={song + i}
                  onClick={() => reveal(curSongs[i])}
                  className={`${styles.card} ${styles.btn}`}
                >
                  <h3>{song}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.back}>
          <a onClick={(e) => handleClick(e, "/game/songs-or-artists")}>
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
