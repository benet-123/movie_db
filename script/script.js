const API_KEY = 'api_key=75b4645b8b7663f4a9dea706bbb23300'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const serach = document.getElementById('search');
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const btn2 = document.getElementById("btn2");

const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]
// filter uisng releading dates
// var dates = new Date();
// var dateonly = dates.getDate();
// var yearonly = dates.getFullYear();
// var monthonly = dates.getMonth();
// if(monthonly<9){
//     var formatted = yearonly + '-' +'0'+ monthonly + '-' + dateonly;

// }
// else{
//     var formatted = yearonly + '-' + monthonly + '-' + dateonly;

// }
// console.log(formatted);

// const filterURL = BASE_URL + '/discover/movie?primary_release_date.gte=' + formatted + '&primary_release_date.lte=' + formatted + '&' + API_KEY;

// getoday(filterURL);
// function getoday(todayurl) {
//     console.log(filterURL);
//     fetch(todayurl).then(res => res.json()).then(datas => {
//         console.log(datas.results.release_date);
//     })
// }


// filter using genres

const genrelist = [];
getgenres();
function getgenres() {
    genres.forEach(genre => {
        const tags = document.createElement('div');
        tags.classList.add('tag');
        tags.id = genre.id;
        tags.innerText = genre.name;

        tags.addEventListener('click', () => {
            if (genrelist == 0) {
                genrelist.push(genre.id);

            }

            else {
                if (genrelist.includes(genre.id)) {
                    genrelist.forEach((id, index) => {
                        genrelist.splice(index, 1)
                    })
                }
                else {
                    genrelist.push(genre.id);
                }
            }

            console.log(genrelist);

            fetchmovies(API_URL + '&with_genres=' + encodeURI(genrelist.join(',')))
            highlight()
        })

        btn2.appendChild(tags)
    })
}

// addhiglighting function to the tags
function highlight() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag) => {
        tag.classList.remove('highlights');
    })
    if (genrelist.length != 0) {
        genrelist.forEach(id => {
            const highlightTag = document.getElementById(id);
            highlightTag.classList.add('highlights')
        })
    }
}

// to fetch movies
fetchmovies(API_URL)
function fetchmovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        if (data.results.length !== 0) {
            showmovielist(data.results)
        }
        else {
            alert("No Results found")
        }
    })
}

// to show movies
function showmovielist(data) {
    main.innerHTML = ''
    data.forEach(movie => {
        const { title, poster_path, vote_average } = movie;
        const moviecard = document.createElement('div')
        moviecard.classList.add('card');
        moviecard.innerHTML = `<img src="${IMAGE_URL + poster_path}" alt="${title}">
        <h3>${title}</h3>
        <h5><i class="fa-solid fa-star text-warning me-3"></i>${vote_average}</h5>`
        main.appendChild(moviecard)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const serachterm = serach.value;
    if (serachterm) {
        fetchmovies(SEARCH_URL + '&query=' + serachterm)
    }
})