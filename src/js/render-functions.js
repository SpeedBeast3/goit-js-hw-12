import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  if (!gallery) return;

  const markup = images
    .map(
      img => `
<li class="gallery-item">
  <a href="${img.largeImageURL}">
    <img src="${img.webformatURL}" alt="${img.tags}" />
  </a>
  <div class="info">
    <p>Likes: ${img.likes}</p>
    <p>Views: ${img.views}</p>
    <p>Comments: ${img.comments}</p>
    <p>Downloads: ${img.downloads}</p>
  </div>
</li>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  if (!gallery) return;
  gallery.innerHTML = "";
}

export function showLoader() {
  if (!loader) return;
  loader.classList.remove("hidden");
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add("hidden");
}

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add("hidden");
}