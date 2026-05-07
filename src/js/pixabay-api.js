import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "55656365-3c91dbda272652fb6677c72ed";

export async function getImagesByQuery(query, page) {
  const { data } = await axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 15,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });

  return data;
}


