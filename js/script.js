'use strict';

const
    attributeHref = 'href',
    classActive = 'active',
    eventClick = 'click',
    optArticleTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

const titleClickHandler = function (event) {
    console.log('=> titleClickHandler');
    event.preventDefault();
    const clickedElement = this;
    removeClass(document.querySelectorAll('.titles a.active'), classActive);
    clickedElement.classList.add(classActive);
    removeClass(document.querySelectorAll('article.active'), classActive);
    const hrefAttributeValueOfClickedLink = this.getAttribute(attributeHref).substring(1);
    const articleRelatedToClickedLink = document.getElementById(hrefAttributeValueOfClickedLink);
    articleRelatedToClickedLink.classList.add(classActive)
}

const removeClass = function (objects, clazz) {
    for (let object of objects) {
        object.classList.remove(clazz)
    }
}

function clearLinks() {
    const link_tags = document.querySelectorAll(optTitleListSelector);
    for (let object of link_tags) {
        object.innerText = ''
    }
};

const articles = document.querySelectorAll('.posts article');

function generateTitleLinks() {
    console.log('=> generateTitleLinks');
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optArticleTitleSelector).innerHTML;
        const li = document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');
        span.innerText = articleTitle;
        a.setAttribute(attributeHref, '#' + articleId);
        a.insertAdjacentElement('afterbegin', span);
        if (articleId === 'article-1') {
            a.classList.add(classActive);
        }
        li.insertAdjacentElement('afterbegin', a);
        const div = document.querySelector(optTitleListSelector);   //pobieramy miejsce docelowe
        div.appendChild(li);
        a.addEventListener(eventClick, titleClickHandler);
    }
};

generateTitleLinks();
