import styles from "../../styles/Home.module.css";
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
      <div className={styles.grid2}>
        <h2 className={styles.title}>Select one</h2>
      </div>

      <div className={`${styles.grid2} ${styles.select}`}>
        <a onClick={(e) => handleClick(e, "/game/songs")}>
          <h1>Guess My Top Songs</h1>
        </a>
      </div>
      <div className={`${styles.grid2} ${styles.select}`}>
        <a onClick={(e) => handleClick(e, "/game/artists")}>
          <h1>Guess My Top Artists</h1>
        </a>
      </div>

      <div className={styles.back}>
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
