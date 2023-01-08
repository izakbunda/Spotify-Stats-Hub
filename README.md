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
          For more techincal details, please checkout the Spotify API Documentation linked below:
        </p>
        <div className={styles.main3}>
          <div className={`${styles.grid2} ${styles.select3}`}>
            <a href="https://developer.spotify.com/documentation/">
              <h1>Spotify API Documentation</h1>
            </a>
          </div>
        </div>
      </div>


# How it works!

## Step 1: Login
<img width="1356" alt="Screen Shot 2023-01-08 at 2 01 39 AM" src="https://user-images.githubusercontent.com/98503066/211190225-2c1370cb-0d50-492a-a60f-e16940629500.png">

## Step 2: Welcome to the Landing Page. 
Users can select from three options. They can either view their listening habits in the Stats section, test their knowledge of their listening habits in the Game sections, or find other Spotify stats websites under the Other Sites section.
<img width="1356" alt="Screen Shot 2023-01-08 at 2 02 01 AM" src="https://user-images.githubusercontent.com/98503066/211190273-4abf8edf-3665-44d4-bb6e-817de2fa047f.png">

### Under the Stats section, users can decide whether they want to see their top tracks or top artists for either the last four weeks, the last six months, or for all time.  
<img width="1356" alt="Screen Shot 2023-01-08 at 2 02 05 AM" src="https://user-images.githubusercontent.com/98503066/211190320-b6d83bbe-857c-4c66-85a2-53eb669b701e.png"><img width="1356" alt="Screen Shot 2023-01-08 at 2 02 11 AM" src="https://user-images.githubusercontent.com/98503066/211190325-a5b4a386-2953-47b6-ba04-86daed499a2f.png">

### Under the Game section, users can guess their tops within the same time intervals as the Stats section. Their top 10 is first hidden and they must guess one-by-one their favorites and see their correctness score as they go.
<img width="1356" alt="Screen Shot 2023-01-08 at 2 02 51 AM" src="https://user-images.githubusercontent.com/98503066/211190416-20e79a91-2c94-4ef7-801a-c1e3792b038f.png">

### Under the Other Sites section, users can check out other cool websites that make use of the Spotify API.
<img width="1356" alt="Screen Shot 2023-01-08 at 2 03 03 AM" src="https://user-images.githubusercontent.com/98503066/211190436-cf27d1c7-fd4a-475b-a359-96fb4478ac92.png">

## Step 3: About
In the footer of all pages is a button to the About page of this website. In here users can learn more about the process of creating this page and the Spotify API.


