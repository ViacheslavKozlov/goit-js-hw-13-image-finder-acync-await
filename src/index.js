import ApiPixabay from './js/apiService';
import imageMarkup from './templates/imagemarkup.hbs';
import styles from './css/styles.css';

const refs = {
    input: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    searchBtn: document.querySelector('.search-btn')
}

const apiPix = new ApiPixabay();

refs.input.addEventListener('submit', onInput);
refs.loadMoreBtn.addEventListener('click', onClickLoadMore);

function onInput(evt) {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements.query.value.trim()
    apiPix.q = searchQuery;
    if (searchQuery === '') {
        return
    }
    refs.searchBtn.disabled = true;
    refs.gallery.innerHTML = '';
    apiPix.resetPage();
    getImages();
    smoothScrolling();
}

async function getImages() {
    const data = await apiPix.fetchImages();
        renderMarkup(data);
        refs.searchBtn.disabled = false;
        refs.loadMoreBtn.classList.remove('is-hidden');
}

function renderMarkup({ hits }) {
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkup(hits))
}

async function onClickLoadMore() {
    apiPix.incrementPage();

    const data = await apiPix.fetchImages();
            renderMarkup(data)
            smoothScrolling();
}

function smoothScrolling() {
    setTimeout(refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    }), 500)
    
}