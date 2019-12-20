'use strict';

const titleClickHandler = function (event) {
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */
    removeClass(document.querySelectorAll('.titles a.active'), 'active')

    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */
    removeClass(document.querySelectorAll('article.active'), 'active')

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

const removeClass = function (objects, clazz) {
    for (let object of objects) {
        object.classList.remove(clazz)
    }
}