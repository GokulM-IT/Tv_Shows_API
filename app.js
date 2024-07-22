const container = document.querySelector('#container');
const form = document.querySelector('form');

const setShowImage = (datas) => {
    container.innerHTML = '';

    datas.forEach(result => {
        if (result.show.image) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const rating = document.createElement('p');
            const name = document.createElement('p');
            const randomRating = Math.floor(Math.random() * 5) + 5;

            img.src = result.show.image.medium;
            rating.innerHTML = result.show.rating.average ? `⭐ ${result.show.rating.average}` : `⭐ ${randomRating}`;
            name.innerHTML = result.show.name.length > 18 ? `${result.show.name.substring(0, 18)}...` : result.show.name;
            div.append(img, rating, name);
            container.append(div);
        }
    })
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = form.query.value;
    const config = { params: { q: query } }

    try {
        const response = await axios.get('https://api.tvmaze.com/search/shows', config)
        setShowImage(response.data)
    } catch (error) {
        console.log('Error fetching data : ', error)
    }

    form.query.value = '';
})
