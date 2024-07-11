import axios from "axios";

export default async function fetchImages(query, page = 1) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      orientation: "landscape",
    },
    headers: {
      Authorization: "Client-ID 0_AFKIC7n8Biaq3smPYYlHvD42TlmEKWIm1fLg0y8sI",
    },
  });

  return response;
}
