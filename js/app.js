/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

	document.addEventListener('DOMContentLoaded', (event) => {
    /**
     * Define Global Variables
     * 
    */

    //select all sections
    const sections = [...document.querySelectorAll('section')];

    //select ul
    const unorderList = document.getElementById('navbar__list');

    //create fragment 
    const fragment = document.createDocumentFragment();

    /**
     * End Global Variables 
     * 
    */



    /** 
     * Begin Main Functions
     * 
    */

    // build the nav
    sections.forEach(section => {
        // Create il
        const listItem = document.createElement('li');

        // Create a
        const link = document.createElement('a');

        // Add href in a
        const hrefText = section.getAttribute("id");
        link.setAttribute("href" , `#${hrefText}`)
        
        // Add class 'menu__link' to a
        link.setAttribute("class" , "menu__link");

        // Scroll to section on link click
        link.addEventListener('click', e => {
            e.preventDefault();
            section.scrollIntoView({behavior : "smooth"});
        });
        // Add text in link
        const dataNav = section.getAttribute("data-nav");
        const textNode = document.createTextNode(dataNav);
        
        link.appendChild(textNode)

        // Add a in li
        listItem.appendChild(link);

        // Add li in fragment
        fragment.appendChild(listItem);

    });

    // Add li in ul
    unorderList.appendChild(fragment);

    //select all a has class 'menu__link'
    const listItems = [...unorderList.querySelectorAll('.menu__link')];

    //add active class to first a
    listItems[0].classList.add('active');

    // Add class 'active' to section when near top of viewport
    function toggleActiveClass (){
        for(let i = 0; i < sections.length; i++){
            //section Top
            var sectionTop = sections[i].getBoundingClientRect().top;

            //Add 'active' class
            if (sectionTop >= -150 && sectionTop <= 500 ) {
                sections[i].classList.add('your-active-class')
                listItems[i].classList.add('active')
            } else {
                sections[i].classList.remove('your-active-class')
                listItems[i].classList.remove('active')
            }
        }
    }
    window.addEventListener('scroll' , toggleActiveClass)

    // Add class 'active' to a when click
    function addActiveClass() {
        for(var i = 0; i < listItems.length; i++){
            const dataNav = sections[i].getAttribute('data-nav');

            if ( listItems[i].textContent === dataNav && sections[i].classList.contains('your-active-class')) {
                listItems[i].classList.add('active');
            } else {
                listItems[i].classList.remove('active');
            }

        }
    }
    listItems.forEach(li => {
        li.addEventListener('click' , addActiveClass);
    });

    // Scroll to anchor ID using scrollTO event
    sections.forEach(sec => {
        for (a of listItems){
            a.addEventListener('click' , e=> {
                e.preventDefault();
                sec.scrollTo({
                    behavior: 'smooth'
                });
            });
        }
    });

    /**
     * End Main Functions
     * 
    */
 

    /* Other things */
    // Add Scroll to Top the page
    // Select header
    const header = document.querySelector('h1');

    //create back to top a
    const goTop = document.createElement('a');

    //select a of goTop
    goTop.addEventListener('click' , e => {
        e.preventDefault();
        window.scrollTo({ 
            top: 100,
            left: 0, 
            behavior: 'smooth' 
        });
    });

    //set attributes of a
    goTop.href = '#top';
    goTop.id = 'back-to-top';
    goTop.textContent = '↑';
    goTop.title = "Back to top";
    goTop.style.cssText = 'display: none';

    //add event scroll to window to display goTop
    window.addEventListener('scroll' , e => {
        e.preventDefault();
        const headerTop = header.getBoundingClientRect().top;
 
        if (headerTop <= 0) {
            goTop.style.cssText = 'display: block';
        }else {
            goTop.style.cssText = 'display: none';
        }
    });

    document.body.appendChild(goTop);

});