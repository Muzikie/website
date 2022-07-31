import React from 'react';
import styles from './artist.css';
import Collection from '../../components/Collection';
import ArtistSummary from '../../components/Artist/ArtistSummary';

import artistData from '@mock/artist-data.json';
import artistAlbums from '@mock/artist-albums.json';

const Artist = () => (
  <section className={styles.wrapper}>
    <ArtistSummary data={artistData} />
    <Collection
      title="Popular"
      tracks={artistData.mostPopular}
      itemsPerColumn="2"
      className={styles.popularTracks}
    />
    <Collection
      title="Discography"
      albums={artistAlbums}
      itemsPerColumn="2"
      className={styles.discography}
    />
  </section>
);

export default Artist;
