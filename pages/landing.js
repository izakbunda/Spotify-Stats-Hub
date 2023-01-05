import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { _token } from "../slices/tokenSlice";

export default function landing() {
  const router = useRouter();

  const handleClick = (e, path) => {
    e.preventDefault();

    if (path === "/stats-landing") {
      router.push("/stats-landing");
    }
    if (path === "/game/songs-or-artists") {
      router.push("/game/songs-or-artists");
    }
    if (path === "/other-sites") {
      router.push("/other-sites");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <h1 className={styles.title}>Spotify Stats Hub &#128187;</h1>

        <h3 className={styles.description}>
          Find out how you listen to music and more!
        </h3>
      </div>

      <a onClick={(e) => handleClick(e, "/stats-landing")}>
        <div className={styles.select}>
          <h1>Stats &#128200; </h1>
          <p className={styles.description}>
            Find out how you listen to music and more!
          </p>
        </div>
      </a>

      <a onClick={(e) => handleClick(e, "/game/songs-or-artists")}>
        <div className={styles.select}>
          <h1>Game &#127918; </h1>
          <p className={styles.description}>
            How well do you know your listening activity?
          </p>
          <p className={styles.description}>
            Don't cheat by looking at your Stats first! &#128545;
          </p>
        </div>
      </a>

      <a onClick={(e) => handleClick(e, "/other-sites")}>
        <div className={styles.select}>
          <h1>Other Sites &#127760; </h1>
          <p className={styles.description}>
            Check out other stats sites like Spotify Pie, Festify, and more!
          </p>
        </div>
      </a>

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
    </main>
  );
}
