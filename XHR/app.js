(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID f1d8ff049149e21c9814ded77f32a224a35c9934b860a28b3de07f2711515a14');
    unsplashRequest.send()

    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=45723a56ceb5435784c634ff66883b79`);
    articleRequest.send();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    function addImage() {
        //debugger; //pause to check what has been returned
        let htmlContent = '';
        const data = JSON.parse(this.responseText); //convert json to js object

        if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption> ${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    function addArticles() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText); //convert json to js object

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article => `<li class='article'>
            <h2><a href="${article.web_url}">${article.headermain}</a></h2>
            <p>${article.snippet}</p>
            </li>`).join('') + '</ul>'
        } else {
            htmlContent = '<div class="error-no-article"> No article </div>'
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

    }



})();