(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = 'hippos';
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
        console.log('helloworld')  
    }

})();



