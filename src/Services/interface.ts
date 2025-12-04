import { Cloudinary } from "@cloudinary/url-gen";

interface Category {
  id: string;
  name: string;
}

interface Movie {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;  // không phải File
  posterUrl: string;  // không phải File
  categoryIds: string[];
  trailer: string;
}

const cloudName = 'dsdtprmq5';
const cld = new Cloudinary({ cloud: { cloudName } });

export type {Category, Movie}

export {cld,cloudName}

