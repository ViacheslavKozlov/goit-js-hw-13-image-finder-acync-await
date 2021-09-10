// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

export default class ApiPixabay {  
    #API_KEY = '23294543-72cf202e86e11bc05e525db7a';
    BASE_URL = 'https://pixabay.com/api';

    constructor() {
        this.q = '';
        this.page = 1;
    }

    async fetchImages() {
        const searchParameters = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            q: this.q,
            page: this.page,
            per_page: 12,
            key: this.#API_KEY,
        });

        const response = await fetch(`${this.BASE_URL}?${searchParameters}`);
                if (response.status === 404) {
                    return Promise.reject('Not found');
                }
                return response.json();
    }
    
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}
