'use strict';

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('clickedElement', clickedElement);

    /* remove class 'active' from all article links  */
    removeClass(document.querySelectorAll('.titles a.active'), 'active');

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    removeClass(document.querySelectorAll('article.active'), 'active');

    /* get 'href' attribute from the clicked link */
    const hrefAttributeValueOfClickedLink = this.getAttribute('href').substring(1);

    /* find the correct article using the selector (value of 'href' attribute) */
    const articleRelatedToClickedLink = document.getElementById(hrefAttributeValueOfClickedLink);

    /* add class 'active' to the correct article */
    articleRelatedToClickedLink.classList.add('active')
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