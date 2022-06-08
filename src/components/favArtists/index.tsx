import React from 'react';
import { Link } from 'wouter';
import Collection from '../Collection';
import styles from './favArtists.css';
import goPremium from '../../assets/images/mocks/goPremium.png';
import data from '../../screens/Artist/similar-artists.json';

const FavArtists = () => {
  return (
    <aside className={styles.wrapper}>
      <section className={styles.ads}>
        <Link href="/subscribe">
          <figure>
            <img src={goPremium} alt="Go Premium" />
          </figure>
        </Link>
      </section>
      <Collection
        title="Favorite artists"
        artists={data}
        itemTheme="smallRow"
      />
    </aside>
  );
};

export default FavArtists;