import thumbnailPlaceholder from '@/public/images/gallerymini.png';
import largePlaceholder from '@/public/images/gallerymain.png';
import {ImageFormats, ImageSizes, ImageSource} from '@/app/config/types';

const priorities = [
  ImageSizes.Thumbnail,
  ImageSizes.Small,
  ImageSizes.Medium,
  ImageSizes.Large,
];
const reversePriorities = priorities.reverse();

const baseURl = `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${process.env.NEXT_PUBLIC_IMAGE_PORT ? ':' + process.env.NEXT_PUBLIC_IMAGE_PORT : ''}`

export const getSmallestSize = (obj: ImageFormats): ImageSource => {
  let source = {...thumbnailPlaceholder};
  for (const size of priorities) {
    if (obj.hasOwnProperty(size)) {
      source = {
        src: `${baseURl}${obj[size].url}`,
        width: obj[size].width,
        height: obj[size].height,
      };
      break;
    }
  }

  return source;
};

export const getLargestSize = (obj: ImageFormats): ImageSource => {
  let source = {...largePlaceholder};

  for (const size of reversePriorities) {
    if (obj.hasOwnProperty(size)) {
      source = {
        src: `${baseURl}${obj[size].url}`,
        width: obj[size].width,
        height: obj[size].height,
      };
      break;
    }
  }

  return source;
};
