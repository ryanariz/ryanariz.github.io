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

    console.log(pages);

    let idArray = [];
    pages.forEach(page => {
        idArray.push(`${page.id}`);
    });
    console.log(idArray);

    let menuArray = ['about', 'contact', 'resume'];

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
            if (id === menuArray[0]) {
                replace.innerHTML = `
                <div class="about">
                    <h1>This is Ryan Sky.</h1>
                    <h3>A 22-year-old artist who enjoys drawing in black and white, photographing doors, hiking to lakes, making music, and tattoos. She loves Radiohead, Blur, and Supergrass, though currently listens to Zero 7, Dr. Dog, and J.J. Cale.</h3>
                    <div><img src="Portfolio-Content/about/ryansky.jpg" alt="Photo of Ryan Sky"></div>
                </div>
                `;
                console.log("about");
                return;
            } else if (id === menuArray[1]) {
                replace.innerHTML = `
                <div class="contact">
                    <h1>If you'd like to work together, ask a question, or for anything at all, feel free to reach out to me at:</h1>
                    <p>sky@arizmendi.org</p>
                </div>
                `;
                console.log("contact");
                return;
            } else if (id === menuArray[2]) {
                replace.innerHTML = `
                <div class="resume">
                    <div class="profExp">
                        <h3>PROFESSIONAL EXPERIENCE</h3>
                        <h4>Graphic Design Intern | The Syndicate</h4>
                        <h4>Feb 2023 - April 2023</h4>
                        <ul>
                            <p>• Assisted and created still and video flyers, assets, and product mockups for clients</p>
                            <p>• Helped department supervisors in the brainstorming process for client projects</p>
                            <p>• Explored different design styles by adapting to a variety of client requests</p>
                        </ul>
                    </div>
                    <div class="skills">
                        <h3>SKILLS</h3>
                            <div class="skill">
                                <i><h4>DESIGN</h4></i>
                                <p>Illustrator</p>
                                <p>Blender</p>
                                <p>Photoshop</p>
                                <p>InDesign</p>
                                <p>AfterEffects</p>
                            </div>
                            <div class="skill">
                                <i><h4>CODING</h4></i>
                                <p>HTML</p>
                                <p>CSS</p>
                                <p>JavaScript</p>
                            </div>
                            <div class="skill">
                                <i><h4>HANDS-ON</h4></i>
                                <p>Illustration</p>
                                <p>Photography</p>
                                <p>Pottery</p>
                                <p>Embroidery</p>
                            </div>
                            <div class="skill">
                                <i><h4>MUSIC</h4></i>
                                <p>Guitar</p>
                                <p>GarageBand</p>
                                <p>Cubase</p>
                                <p>Audacity</p>
                                <p>Piano</p>
                            </div>
                    </div>
                    <div class="education">
                        <h3>EDUCATION</h3>
                        <h4>Rutgers University | New Brunswick</h4>
                        <h4>Bachelor's Degree | 2023</h4>
                        <ul>
                            <p>• Major in Information Technology & Informatics for Web Design & Development</p>
                            <p>• Minor in Entrepreneurship</p>
                            <p>• Magna Cum Laude</p>
                        </ul>
                    </div>
                </div>
                `;
                console.log("resume");
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
                    <div id="type">${selectedPage.type}</div>
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
            }
            else {
                const imageArray=selectedPage.image;
                if (Array.isArray(imageArray) === true){
                    imageArray.forEach((image) => {
                        mediaDiv.innerHTML += `<img class="media" src="${image}"></img>`;
                    });
                } else {
                    mediaDiv.innerHTML += `<img class="media" src="${selectedPage.image}"></img>`;
                }
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


