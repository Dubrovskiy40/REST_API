const APIraw = 'https://api.tvmaze.com/search/shows?q=';
const itemWrap = document.querySelector('.item__wrap');
const inp = document.querySelector('.inp');
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    let API = APIraw + inp.value;
    console.log('API in',API);
    getData(API);
    inp.value = '';
});

const createTemplate = (data) => {

    let dataShort = data.show;
    let genres = dataShort.genres.length ? [...dataShort.genres] : 'Жанр не известен ¯\\_(ツ)_/¯';

    return `
        <div class="item">
            <div class="item__img">
                <img class="img" src="${dataShort.image ? dataShort.image.medium : '../img/notFound.jpg'}" alt="${dataShort.name}">
            </div>
            <div class="item__name">
                <span class="span">Название:</span> ${dataShort.name ? dataShort.name : 'Название потерялось ¯\\_(ツ)_/¯'}
            </div>
            <div class="item__releaseDate">
                <span class="span">Дата выхода:</span> ${dataShort.premiered ? dataShort.premiered : 'Увы, не знаю ¯\\_(ツ)_/¯'}
            </div>
                <div class="item__genres">
                <span class="span">Жанр:</span> ${genres}
            </div>
            <div class="item__rating">
                <span class="span">Рейтинг:</span> ${data.score.toFixed(2)}
            </div>
            <div class="item__summary">
                <span class="span">Описание:</span> ${dataShort.summary ? dataShort.summary : 'Не придумал ¯\\_(ツ)_/¯'}
            </div>
        </div>
    `
}

function getData(value) {
    fetch(value)
        .then(response => response.json())
        .then(data => {
            if (data) {
                itemWrap.innerHTML = '';
                data.forEach(item => {
                    itemWrap.innerHTML += createTemplate(item);
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
