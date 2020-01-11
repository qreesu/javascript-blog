'use strict';

const
    attributeHref = 'href',
    attributeDataTag = 'data-tags',
    attributeDataAuthor = 'data-author',
    classActive = 'active',
    eventClick = 'click',
    optArticleSelector = '.post',
    optArticleAuthorSelector = '.post-author',
    optArticleTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags .list',
    optTitleListSelector = '.titles';


const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    removeClass(document.querySelectorAll('.titles a.active'), classActive);
    clickedElement.classList.add(classActive);
    console.log('clickedElement', clickedElement);
    removeClass(document.querySelectorAll('article.active'), classActive);
    const hrefAttributeValueOfClickedLink = this.getAttribute(attributeHref).substring(1);
    console.log(hrefAttributeValueOfClickedLink);
    const articleRelatedToClickedLink = document.getElementById(hrefAttributeValueOfClickedLink);
    articleRelatedToClickedLink.classList.add(classActive);
};

const tagClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = event.target;
    const href = clickedElement.getAttribute(attributeHref);
    const tag = href.replace('#tag-', '');
    removeClass(document.querySelectorAll('a.active[href^="#tag-"]'), classActive);
    clickedElement.classList.add(classActive);
    generateTitleLinks('[data-tags~="' + tag + '"]');
};

const authorClickHandler = function (event) {
    console.log('=> authorClickHandler');
    event.preventDefault();
    const clickedElement = event.target;
    console.log('clickedElement', clickedElement);
    const href = clickedElement.getAttribute(attributeHref);
    const author = href.replace('#tag-', '');
    console.log('author', author);
    removeClass(document.querySelectorAll('a.active[href^="#tag-"]'), classActive);
    clickedElement.classList.add(classActive);
    generateTitleLinks('[data-author="' + author + '"]');
};

const removeClass = function (objects, clazz) {
    for (let object of objects) {
        object.classList.remove(clazz);
    }
};

const clearTitleLinks = function () {
    const link_tags = document.querySelectorAll(optTitleListSelector);
    for (let object of link_tags) {
        object.innerText = '';
    }
};

const getArticleTitle = function (article) {
    return article.querySelector(optArticleTitleSelector).innerHTML;
};

function generateTitleLinks(customSelector = '') {
    clearTitleLinks()
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let i = 1;
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const li = document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');
        span.innerText = getArticleTitle(article);
        a.setAttribute(attributeHref, '#' + articleId);
        a.insertAdjacentElement('afterbegin', span);
        if (i === 1) {
            a.classList.add(classActive);
            i++;
        }
        li.insertAdjacentElement('afterbegin', a);
        const div = document.querySelector(optTitleListSelector);
        div.appendChild(li);
        a.addEventListener(eventClick, titleClickHandler);
    }
}

function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);
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
            a.addEventListener(eventClick, tagClickHandler);
        }
    }
}

function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const dataAuthorValue = article.getAttribute(attributeDataAuthor);
        const a = document.createElement('a');
        a.setAttribute(attributeHref, '#tag-' + dataAuthorValue);
        a.innerText = dataAuthorValue;
        const div = article.querySelector(optArticleAuthorSelector);
        div.appendChild(a);
        a.addEventListener(eventClick, authorClickHandler);
    }
}

generateTitleLinks();
generateTags();
generateAuthors();