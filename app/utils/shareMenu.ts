import {Project} from '@/app/components/Projects/types';
import {ImageFormats, AccountAttrs} from '@/app/config/types';
import {getSmallestSize} from './image';

export const getShareInfo = (
  project: Project,
  artist: AccountAttrs,
) => {
  const artistName =
      artist?.first_name || artist?.last_name
        ? `${artist.first_name} ${artist.last_name}`
        : `${artist?.email}`;
  const url = `https://app.muzikie.com/projects/${project.documentId}`;
  const image = getSmallestSize(project.images?.length ? project.images[0].formats : ({} as ImageFormats));

  return {artistName, url, image};
};

export const shareProjectInvitation = async (
  user: AccountAttrs | undefined,
  project: Project,
  artist: AccountAttrs,
) => {
  const {artistName, url} = getShareInfo(project, artist);
  const userName =
    user?.first_name || user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email;
  const message = `
    ${userName} just invited you to discover a new music project on Muzikie!
    🎵 ${project.name} by ${artistName}
    Check it out and show your support:  
    ${url}
  `;

  try {
    await navigator.share({
      text: message.trim(),
    });
  } catch (err) {
    console.log('Error', err.message);
  }
};
