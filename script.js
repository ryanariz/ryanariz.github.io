async function loadPages() {
    // OR return (await fetch("pages.json")).json();
    const response = await fetch("pages.json");
    const pages = await response.json();

    return pages;
}

document.addEventListener("DOMContentLoaded", async () => {
    let pages = [];

    try {
        pages = await loadPages();
        console.log("Fetch successful")
    } catch (error) {
        console.log("Fetch unsuccessful");
        console.log(error);
    }

    // console.log(pages);

    let idArray = [];
    pages.forEach(page => {
        idArray.push(`${page.id}`);
    });
    // console.log(idArray);

    let menuArray = ['about', 'resume'];

    // Will be used to hide mobileDropDown when item on menu is clicked
    // Will also be used in toggling mobileDropDown further in code
    const mobileDropDown = document.getElementById('mobile-dropdown');
    const computedStyle = window.getComputedStyle(mobileDropDown);

    function handleClick(id) {
        document.body.scrollTop = 0;
        if (computedStyle.display === "flex") {
            mobileDropDown.style.display = "none";
        }
        
        // Checks if id passed is '' or exists in array of page or menu IDs
        if (id==='' || (idArray.indexOf(id)===-1 && menuArray.indexOf(id)===-1)) {
            document.querySelector('.projects').style.display = "grid";
            document.querySelector('.replace').style.display = "none";
            //Checks article with class "replace" for video, then pauses it if article is hidden
            const vidEl = document.querySelector('.pageVid');
            if (vidEl) {
                vidEl.pause();
            }
            return;
        } else if (menuArray.indexOf(id)!=-1) {
            document.querySelector('.projects').style.display = "none";
            document.querySelector('.replace').style.display = "flex";
            replace.classList.add('newHTML');
            // about
            if (id === menuArray[0]) {
                replace.innerHTML = `
                <div class="about">
                    <h1>Ryan Sky</h1>
                    <h3 id="about-text">A designer from New Jersey. My work is inspired by designs of the blues, rock and punk era, Art Nouveau, and the many artists and designers I’ve met in university, at art shows, and on my road trips. I'm interested in the promotional branding of artists and businesses in the entertainment sector, though eager to work alongside businesses of all kinds.</h3>
                    <h3>Email: ryanskydesigns@gmail.com<br>Instagram: @skazure</h3>
                    <div><video class="media pageVid" width="100%" autoplay loop muted playsinline><source src="Portfolio-Content/about/about.mp4" type="video/mp4"> 
                    Your browser does not support this video.
                </video></div>
                </div>
                `;
                // console.log("about");
                return;
            // resume
            } else if (id === menuArray[1]) {
                replace.innerHTML = `
                <div class="resume"><img src="Portfolio-Content/resume/Ryan-Arizmendi.png" alt="Photo of Ryan Sky"></div>
                `;
                // console.log("resume");
                return;
            }
        } else if (idArray.indexOf(id)!=-1) {
            document.querySelector('.projects').style.display = "none";
            document.querySelector('.replace').style.display = "flex";
        }
        
        const selectedPage = pages.find(page => page.id === id);
        const selectedPageIndex = pages.findIndex(page => page.id == id);
        
        // Assigns previous and next buttons with id
        if (selectedPageIndex == 0) {
            var prevIdIndex = (pages.length - 1);
            var prevId = pages[prevIdIndex].id;
        } else {
            var prevIdIndex = selectedPageIndex - 1;
            var prevId = pages[prevIdIndex].id;
        }
        if (selectedPageIndex === (pages.length - 1)) {
            var nextId = pages[0].id;
        } else {
            var nextIdIndex = selectedPageIndex + 1;
            var nextId = pages[nextIdIndex].id;
        }

        if (selectedPage) {
            replace.classList.add('newHTML');

            replace.innerHTML = `
                <div class="info">
                    <div id="title">
                        <a class="nav" href="#${prevId}" id="${prevId}">⇽</a>
                        <div>${selectedPage.title}</div>
                        <a class="nav" href="#${nextId}" id="${nextId}">⇾</a>
                    </div>
                    <div id="date">${selectedPage.date}</div>
                    
                    <div id="text">${selectedPage.text}</div>
                </div>
                <div class="mediaDiv">
                </div>
            `;

            const mediaDiv = document.querySelector('.mediaDiv');
            console.log(mediaDiv)

            if (selectedPage.vid){
                mediaDiv.innerHTML = `
                <video class="media pageVid" controls loop>
                    <source src="${selectedPage.vid}" type="video/mp4" alt="${selectedPage.alt}"> 
                    Your browser does not support this video.
                </video>
                `
                ;
            } else if (selectedPage.image){
                const imageArray=selectedPage.image;
                if (Array.isArray(imageArray) === true){
                    imageArray.forEach((image) => {
                        mediaDiv.innerHTML += `<img class="media" src="${image}"></img>`;
                    });
                } else {
                    mediaDiv.innerHTML += `<img class="media" src="${selectedPage.image}"></img>`;
                }
            // v NOT IN USE
            } else if (selectedPage.link){
                mediaDiv.innerHTML = `
                <iframe width="560" height="315"  src="${selectedPage.link.src}" title="${selectedPage.link.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                `
            }
        
            
            const medias = document.querySelectorAll('.media');
            if (selectedPage.medType === 'vert') {
                medias.forEach(media => {
                    media.classList.add('mediaVert');
                });
            } else if (selectedPage.medType === 'hor') {
                medias. forEach(media => {
                    media.classList.add('mediaHor');
                });
            }
        }
        console.log("DONE");
        return;
    }

    const projects = document.querySelectorAll('.project');
    const replace = document.querySelector('.replace');

    replace.addEventListener('click', function(event) {
        if (event.target.classList.contains('nav')) {
            const navId = event.target.id;
            handleClick(navId);
        }
    });

    // Toggle mobileDropDown visibility
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    mobileMenuButton.addEventListener('click', function() {
        if (computedStyle.display === "none") {
            mobileDropDown.style.display = "flex";
        } else {
            mobileDropDown.style.display = "none";
        }
    });



    //If page has been preloaded, url hash passed through handleClick()
    const hash = window.location.hash;
    handleClick(hash.substring(1));

    window.onpopstate = function() {
        const hash = window.location.hash;
        handleClick(hash.substring(1));
    }
});


