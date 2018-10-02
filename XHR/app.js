(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID f1d8ff049149e21c9814ded77f32a224a35c9934b860a28b3de07f2711515a14');
    unsplashRequest.send()
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
    function addImage(){
        //debugger; //pause to check what has been returned
        const data = JSON.parse(this.responseText); //convert json to js object
        const firstImage = data.results[0];

        if (firstImage) {
        htmlContent = `<figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption> ${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
        } else {
            htmlContent = 'Unfortunately, no image was returned for your search.'
        }

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);

    }

})();


