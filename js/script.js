'use strict';

const
    attributeHref = 'href',
    attributeDataTag = 'data-tag',
    classActive = 'active',
    eventClick = 'click',
    optArticleTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags .list',
    optTitleListSelector = '.titles';

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    removeClass(document.querySelectorAll('.titles a.active'), classActive);
    clickedElement.classList.add(classActive);
    removeClass(document.querySelectorAll('article.active'), classActive);
    const hrefAttributeValueOfClickedLink = this.getAttribute(attributeHref).substring(1);
    const articleRelatedToClickedLink = document.getElementById(hrefAttributeValueOfClickedLink);
    articleRelatedToClickedLink.classList.add(classActive);
};

const removeClass = function (objects, clazz) {
    for (let object of objects) {
        object.classList.remove(clazz);
    }
};

const articles = document.querySelectorAll('.posts article');

function generateTitleLinks() {
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
        const div = document.querySelector(optTitleListSelector);
        div.appendChild(li);
        a.addEventListener(eventClick, titleClickHandler);
    }
}

generateTitleLinks();

function generateTags() {
    for (let article of articles) {
        const dataTagValue = article.getAttribute(attributeDataTag);
        const tags = dataTagValue.split(' ');
        for (let tag of tags) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute(attributeHref, '#tag-' + tag);
            a.innerText = tag;
            li.insertAdjacentElement('afterbegin', a);
            const div = article.querySelector(optArticleTagsSelector);
            div.appendChild(li);
        }
    }
}

generateTags();
