import React, {FC} from 'react';
import Head from 'next/head';
import type { Metadata } from 'next'

import {getProjectDetails} from '@/app/actions/getProjectDetails';
import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import ProjectDetails from '@/app/components/ProjectDetails';
import {getShareInfo} from '@/app/utils/shareMenu';


export async function generateMetadata(
  {params}: {params: Promise<{ id: string }>},
): Promise<Metadata> {
  const awaitedParams = await params;
  const {artist, project} = await getProjectDetails(awaitedParams.id);
  const {artistName, image} = getShareInfo(project, artist);
 
  return {
    title: `${project.name} by ${artistName}`,
    description: 'Discover and support this new music project on Muzikie.',
    icons: [image.src],
  }
}

const ProjectDetailsScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  let {artist, project} = await getProjectDetails(awaitedParams.id);

  const refresh = async () => {
    'use server'
    const result = await getProjectDetails(awaitedParams.id);
    artist = result.artist;
    project = result.project;
  };

  const {artistName, url, image} = getShareInfo(project, artist);

  return (
    <>
      <Head>
        <title>{project.name} | Muzikie</title>
        <meta property="og:title" content={`${project.name} by ${artistName}`} />
        <meta property="og:description" content="Discover and support this new music project on Muzikie." />
        <meta property="og:image" content={image.src} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.name} by ${artistName}`} />
        <meta name="twitter:description" content="Discover and support this new music project on Muzikie." />
        <meta name="twitter:image" content={image.src} />
      </Head>
      <SafeArea safeArea>
        <ProjectDetails artist={artist} project={project} onRefresh={refresh} />
      </SafeArea>
    </>
  );
}

export default ProjectDetailsScreen;
