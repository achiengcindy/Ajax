(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    // full XHR request
    searchedForText = 'hippos';
    // construct an XHR Object
    const unsplashRequest = new XMLHttpRequest();
    //open
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    // handle tell the user the response if requestwas succesful
    unsplashRequest.onload = addImage;
    // if request wasnt fulfiled, it tells the user instead of failing silently
    // unsplashRequest.onerror = handleFailure;
    // set header
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 2e9a7f57c482313bc8aa38bd7239d18da1dcaa7e6c14196445441862448dc78a');
    unsplashRequest.send();
    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);
        if (data && data.results && data.results[0]) {
            const first_image = data.results[0];
            htmlContent = `<figure>
        <img src = "${first_image.urls.regular}" alt="${searchedForText}">
        <figcaption>
        ${searchedForText} by $${first_image.user.name}
        </figcaption>
        </figure>`;

        }
        else {
            htmlContent = `<div class='error-no-image'>No image></div>`

        }
        // 'beforebegin' Before the element itself.
        // 'afterbegin'Just inside the element, before its first child.
        // 'beforeend' Just inside the element, after its last child.
        // 'afterend' After the element itself.
        responseContainer = insertAdjacentHTML('afterbegin', htmlContent)
    }
})();

