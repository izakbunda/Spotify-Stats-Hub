import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function songsOrArtists() {
  const router = useRouter();

  const handleClick = (e, path) => {
    e.preventDefault();
    if (path === "/landing") {
      router.push("/landing");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.grid3}>
        <h2 className={styles.title}>Hi! I'm Izak &#128104;&#8205;&#128187;</h2>
        <h3 className={styles.topSongs2}>
          I am an avid music listener and lover of Spotify and the Spotify API.
          I have tried, tested, and loved all the other Spotify ~stats~ websites
          that I listed on this site and I wanted to try and create my own!
        </h3>
        <p className={styles.description2}>
          Some technical details: I built this website with Next.js which is a
          framework for React. All data (users' top tracks and top artists) is
          pulled from the Spotify API using the implicit grant OAuth flow. I
          implemented React Redux and also used localStorage to persist the
          Spotify Access Token.
        </p>
        <p className={styles.description2}>
          For more techincal details, please checkout the source code in my
          GitHub and Spotify API Documentation linked below:
        </p>
        <div className={styles.main3}>
          <div className={`${styles.grid2} ${styles.select3}`}>
            <a href="https://github.com/izakbunda/Spotify-Stats-Hub">
              <h1>GitHub Source Code</h1>
            </a>
          </div>
          <div className={`${styles.grid2} ${styles.select3}`}>
            <a href="https://developer.spotify.com/documentation/">
              <h1>Spotify API Documentation</h1>
            </a>
          </div>
          <div className={`${styles.grid2} ${styles.select3}`}>
            <a href="https://www.instagram.com/izakbunda/">
              <h1>Instagram lol</h1>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.back2}>
        <a onClick={(e) => handleClick(e, "/landing")}>
          <h1>&#8592; &#8592; Go back </h1>
        </a>
      </div>

      <footer className={styles.footer}>
        <a href="/about">About Spotify Stats Hub</a>
      </footer>
    </main>
  );
}
