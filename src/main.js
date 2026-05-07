import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/style.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;
let currentQuery = "";
const perPage = 15;

form.addEventListener("submit", async e => {
  e.preventDefault();

 currentQuery = e.target.elements["search-text"].value.trim();

if (!currentQuery) return;

    page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits.length) {
      iziToast.error({
        title: "Error",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > perPage) {
  showLoadMoreButton();
}

  } catch (err) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Try again later.",
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
    }

    const card = document
      .querySelector(".gallery-item")
      .getBoundingClientRect();

    window.scrollBy({
      top: card.height * 2,
      behavior: "smooth",
    });
  } catch (err) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Try again later.",
    });
  } finally {
    hideLoader();
  }
});