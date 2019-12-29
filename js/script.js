{
    'use strict';

    const
        attributeHref = 'href',
        classActive = 'active',
        eventClick = 'click',
        optSelectorTags = '.tags a',
        optSelectorTitles = '.titles',
        optArticleTitle = '.post-title';

    const titleClickHandler = function (event) {
        console.log('=> titleClickHandler');
        event.preventDefault();
        const clickedElement = this;
        /* remove class 'active' from all article links  */
        removeClass(document.querySelectorAll('.titles a.active'), classActive);
        /* add class 'active' to the clicked link */
        clickedElement.classList.add(classActive);
        /* remove class 'active' from all articles */
        removeClass(document.querySelectorAll('article.active'), classActive);
        /* get 'href' attribute from the clicked link */
        const hrefAttributeValueOfClickedLink = this.getAttribute(attributeHref).substring(1);
        /* find the correct article using the selector (value of 'href' attribute) */
        const articleRelatedToClickedLink = document.getElementById(hrefAttributeValueOfClickedLink);
        /* add class 'active' to the correct article */
        articleRelatedToClickedLink.classList.add(classActive)
    }

    const removeClass = function (objects, clazz) {
        for (let object of objects) {
            object.classList.remove(clazz)
        }
    }

    function clearLinks() {
        const link_tags = document.querySelectorAll(optSelectorTitles);
        for (let object of link_tags) {
            object.innerText = ''
        }
    }

    function generateTitleLinks() {
        console.log('=> generateTitleLinks');
        const articles = document.querySelectorAll('.posts article');
        for (let article of articles) {
            const articleId = article.getAttribute('id');
            const articleTitle = article.querySelector(optArticleTitle).innerHTML;
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
            const div = document.querySelector(optSelectorTitles);   //pobieramy miejsce docelowe
            div.appendChild(li);
        }
    }

    generateTitleLinks();
    const titleLinks = document.querySelectorAll('.titles a');
    for (let link of titleLinks) {
        link.addEventListener(eventClick, titleClickHandler);
    }
}