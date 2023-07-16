import apiClient from './apiClient';

const API_URL = 'https://dogs-api.nomadcoders.workers.dev';

interface DogVideo {
  isLiked: boolean;
  url: string;
}

export default async function getDogVideo() {
  const data = await apiClient.get(API_URL);

  return data as DogVideo;
}
