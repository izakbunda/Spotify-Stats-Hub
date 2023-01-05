import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function songsOrArtists() {
  const router = useRouter();

  const handleClick = (e, path) => {
    e.preventDefault();

    if (path === "/game/songs") {
      router.push("/game/songs");
    }

    if (path === "/game/artists") {
      router.push("/game/artists");
    }
    if (path === "/landing") {
      router.push("/landing");
    }
  };

  return (
    <main className={styles.main2}>
      <h2 className={styles.title}>Other Websites</h2>

      <p className={styles.description}>
        If you're on this site, chances are, you're super obsessed with your
        listening habits too!
      </p>
      <p className={styles.description}>
        So checkout these other awesome ~stats~ websites :)
      </p>

      <div className={styles.main3}>
        <div className={`${styles.grid2} ${styles.select2}`}>
          <a href="https://huangdarren1106.github.io/">
            <h1>Spotify Pie</h1>
          </a>
        </div>
        <div className={`${styles.grid2} ${styles.select2}`}>
          <a href="https://www.statsforspotify.com/">
            <h1>Stats for Spotify</h1>
          </a>
        </div>
        <div className={`${styles.grid2} ${styles.select2}`}>
          <a href="https://receiptify.herokuapp.com/">
            <h1>Receiptify</h1>
          </a>
        </div>
        <div className={`${styles.grid2} ${styles.select2}`}>
          <a href="https://pudding.cool/2020/12/judge-my-spotify/">
            <h1>Judge My Spotify</h1>
          </a>
        </div>
        <div className={`${styles.grid2} ${styles.select2}`}>
          <a href="https://obscurifymusic.com/login">
            <h1>Obscurify</h1>
          </a>
        </div>
        <div className={`${styles.grid2} ${styles.select2}`}>
          <a href="https://www.kaleidosync.com/">
            <h1>Kaleidosync</h1>
          </a>
        </div>
        <div className={`${styles.grid2} ${styles.select2}`}>
          <a href="https://salty-beach-42139.herokuapp.com/">
            <h1>Festify</h1>
          </a>
        </div>
      </div>
      <div className={styles.back}>
        <a onClick={(e) => handleClick(e, "/landing")}>
          <h1>&#8592; &#8592; Go back </h1>
        </a>
      </div>
    </main>
  );
}
