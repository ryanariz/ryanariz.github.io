async function loadData() {
    // OR return (await fetch("pages.json")).json();
    const response = await fetch("data.json");
    const data = await response.json();
    
    return data;
}

document.addEventListener("DOMContentLoaded", async () => {
    let data = [];

    try {
        data = await loadData();
        console.log("Fetch successful")
    } catch (error) {
        console.log("Fetch unsuccessful");
        console.log(error);
    }

    let graphics = data.graphics;
    let photos = data.photography;
    let illus = data.illustration;
    let all = graphics.concat(photos, illus);
    let idArray = [];
    
    // Creats idArray of all project IDs
    all.forEach(project => {
        idArray.push(project.id);
    });

    // for mobileMenu
    const hamburger = document.getElementById('hamburger');
    const bar = document.querySelectorAll('.bar');
    const mobileMenu = document.getElementById('mobile-menu');

    // for all functions
    const replace = document.querySelector('#replace');

    // for handleClick
    const body = document.body;
    const content = document.querySelector('.content');
    
    // for handleClick2
    // const modal = document.querySelector('#modal');
    // const modalImg = document.querySelector('#modal-img');

    function handleClick(id) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        // If no id is passed, content appears. Should probably make an error page for this.
        if (id==='' || idArray.indexOf(id)===-1) {
            content.style.display = "flex";
            replace.style.display = "none";
            //Checks article with class "replace" for video, then pauses it if article is hidden
            const vidEl = document.querySelector('.pageVid');
            if (vidEl) {
                vidEl.pause();
            }
            return;

        // If id exists in idArray, show replace(page)
        } else if (idArray.indexOf(id)!=-1) {
            content.style.display = "none";
            replace.style.display = "flex";
        }
        
        // Finds project with same id as id clicked
        const project = graphics.find(project => project.id === id);
        
        // Assigns previous and next buttons with id
        let projectIndex = graphics.findIndex(project => project.id === id);
        let prevId = graphics[(projectIndex === 0 ? graphics.length : projectIndex) - 1].id;
        let nextId = graphics[(projectIndex + 1) % graphics.length].id;
        
        if (project) {
            replace.innerHTML = `
                <div id="project-div">
                    <div id="project-info">
                        <h1>${project.title}</h1>
                        <p>${project.type}</p>
                        <p>${project.text}</p>
                    </div>
                    <div class="mediaDiv">
                    </div>
                </div>
                <div id="project-nav">
                    <a class="nav" href="#${prevId}" id="${prevId}">⇽ Previous</a>
                    <a class="nav" href="#${nextId}" id="${nextId}">Next ⇾</a>
                </div>
            `;

            const mediaDiv = document.querySelector('.mediaDiv');

            if (project.vid){
                mediaDiv.innerHTML = `
                <video class="media pageVid" controls loop>
                    <source src="${project.vid}" type="video/mp4" alt="${project.alt}"> 
                    Your browser does not support this video.
                </video>
                `
                ;
            } else if (project.image){
                const imageArray=project.image;
                if (Array.isArray(imageArray) === true){
                    imageArray.forEach((image) => {
                        mediaDiv.innerHTML += `<img class="media" src="${image}"></img>`;
                    });
                } else {
                    mediaDiv.innerHTML += `<img class="media" src="${project.image}"></img>`;
                }
            }
        }
        console.log("DONE");
        return;
    }

    function handleClick2(id) {
        const idExists = idArray.includes(id);
        if (!id || !idExists) {
            content.style.display = "flex";
            replace.style.display = "none";
            return;
        }

        content.style.display = "none";
        replace.style.display = "flex";
        

        // Finds project in illus data
        // const project = illus.find(project => project.id === id);

        const projectIndex = illus.findIndex(project => project.id === id);

        if (projectIndex === -1) return;

        const project = illus[projectIndex];

        // Assigns previous and next navigation
        let prevId = illus[(projectIndex === 0 ? illus.length : projectIndex) - 1].id;
        let nextId = illus[(projectIndex + 1) % illus.length].id;
        console.log(projectIndex, prevId, nextId);

        replace.innerHTML = `
        <div id="project-info">
            <h1>${project.title}</h1>
        </div>
        <div id="illus-image-div">
            <img src="${project.image}" id="illus-image">
        </div>
        <div id="project-nav">
            <a class="nav" href="#${prevId}" id="${prevId}">⇽</a>
            <a class="nav" href="#${nextId}" id="${nextId}">⇾</a>
        </div>
        `;

        let image = document.querySelector('#illus-image');
        let div = document.querySelector('#illus-image-div');

        function adjustDivSize() {
            
            let divAspect = div.clientWidth / div.clientHeight;
            let imgAspect = image.naturalWidth / image.naturalHeight;
            console.log(imgAspect, divAspect);
    
            if (imgAspect > divAspect) {
                // Image is wider than the modal -> fit by width
                image.style.width = "100%";
                image.style.height = "auto";
                console.log("Resizing by width");
            } else {
                // Image is taller than the modal -> fit by height
                image.style.width = "auto";
                image.style.height = "100%";
                console.log("Resizing by height");
            }
        }
    
        // Ensure the image is fully loaded before adjusting size
        image.onload = function () {
            div.style.display = "flex";
            adjustDivSize();
        };
    
        // Adjust on window resize
        window.addEventListener("resize", adjustDivSize);
    }

    function handleClick3(id) {
        // If no id is passed, content appears. Should probably make an error page for this.
        if (id==='' || idArray.indexOf(id)===-1) {
            content.style.display = "flex";
            replace.style.display = "none";
            //Checks article with class "replace" for video, then pauses it if article is hidden
            const vidEl = document.querySelector('.pageVid');
            if (vidEl) {
                vidEl.pause();
            }
            return;

        // If id exists in idArray, show replace(page)
        } else if (idArray.indexOf(id)!=-1) {
            content.style.display = "none";
            replace.style.display = "flex";
        }

        const project = photos.find(project => project.id === id);
        const images = project.image;

        // Assigns previous and next buttons with id
        let projectIndex = photos.findIndex(project => project.id === id);
        let prevId = photos[(projectIndex === 0 ? photos.length : projectIndex) - 1].id;
        let nextId = photos[(projectIndex + 1) % photos.length].id;

        // Splits image array into 3 arrays
        const blockSize = Math.ceil(images.length / 2);
        const block1 = images.slice(0, blockSize);
        const block2 = images.slice(blockSize);

        const blockImages = (block) => {
            return block.map(image => `<img src="Portfolio-Content/Photography/${id}/${image}" alt="${id} Image" class="image">`
            ).join('');
        };

        replace.innerHTML = `
        <div id="project-info">
            <h1>${project.title}</h1>
            <p>${project.type}</p>
            <p>${project.text}</p>
        </div>
        <div id="photography-blocks">
            <div class="block">
                ${blockImages(block1)}
            </div>
            <div class="block">
                ${blockImages(block2)}
            </div>
        </div>
        <div id="project-nav">
            <a class="nav" href="#${prevId}" id="${prevId}">⇽ Previous</a>
            <a class="nav" href="#${nextId}" id="${nextId}">Next ⇾</a>
        </div>
        `;
        return;

    }

    // Toggle mobileDropDown visibility and scroll on click
    hamburger.addEventListener('click', function() {
        bar.forEach(x => x.classList.toggle("change"));
        mobileMenu.classList.toggle("change");
        const mobileMenuStyle = window.getComputedStyle(mobileMenu);
        if (mobileMenuStyle.opacity === "0") {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
            mobileMenu.disabled = true;
            console.log("test");
        }
    });

    //If page has been preloaded, url hash passed through handleClick()
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === "/graphics.html") {
        handleClick(hash.substring(1));
    } else if (path === "/illustration.html") {
        handleClick2(hash.substring(1));
    } else {
        handleClick3(hash.substring(1));
    }

    window.onpopstate = function() {
        const path = window.location.pathname;
        const hash = window.location.hash;
        if (path === "/graphics.html") {
            handleClick(hash.substring(1));
        } else if (path === "/illustration.html") {
            handleClick2(hash.substring(1));
        } else {
            handleClick3(hash.substring(1));
        }
    }
});


