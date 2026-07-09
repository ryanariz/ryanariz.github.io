async function loadData() {
    // OR return (await fetch("pages.json")).json();
    const response = await fetch("/data.json");
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
    let misc = data.misc;
    let all = graphics.concat(photos, illus);
    let idArray = [];
    
    // Creats idArray of all project IDs
    all.forEach(project => {
        idArray.push(project.id);
    });

    // for handleClick
    const replace = document.querySelectorAll('.replace');
    const infoReplace = document.querySelector('#info-replace');
    const mainReplace = document.querySelector('#main-replace');
    const content = document.querySelector('.content');
    const replaceTitle = document.querySelector('#replace-title');
    
    function handleClick(id) {
        console.log('text');
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        // If no id is passed, content appears. Should probably make an error page for this.
        if (id==='' || idArray.indexOf(id)===-1) {
            content.style.display = "flex";
            replace.forEach(item => {
                item.style.display = "none";
            });
            replaceTitle.innerHTML = `Work`;
            return;

        // If id exists in idArray, show replace(page)
        } else if (idArray.indexOf(id)!=-1) {
            content.style.display = "none";
            replace.forEach(item => {
                item.style.display = "flex";
            });
        }
        
        // Finds project with same id as id clicked
        const project = graphics.find(project => project.id === id);

        // Makes <li> list of services
        const services = project.services.map(service => `<p class="txt-white mb-0">${service}</p>`).join('');

        const media = project.media.map(row => {

            const colSize = 12 / row.length;
        
            return row.map(item => {
        
                // IMAGE
                if (item.type === "image") {
                    return `
                        <div class="col col-12 col-md-${colSize}">
                            <img src="${item.src}" class="${item.class} page-media" loading="lazy">
                        </div>
                    `;
                }
                // IMAGE 2 COL - MUST BE EVEN NUMBER OF ITEMS
                if (item.type === "image-col") {
                    return `
                        <div class="col col-6 col-md-${colSize}">
                            <img src="${item.src}" class="${item.class} page-media" loading="lazy">
                        </div>
                    `;
                }
        
                // VIDEO
                if (item.type === "video") {
                    return `
                        <div class="col col-12 col-md-${colSize}">
                            <video class="project-media page-media" autoplay muted loop playsinline>
                                <source src="${item.src}" type="video/mp4">
                            </video>
                        </div>
                    `;
                }

                //COPY TEXT LIGHT TITLE WHITE TEXT
                if (item.type === "copy"){
                    return `
                        <div class="col col-12 col-lg-6">
                            <div class="col"><p class="txt-light">${item.text}</p></div>
                        </div>
                        <div class="col col-12 col-lg-6"></div>
                    `
                }
                // TEXT + IMG (TEXT LIGHT)
                if (item.type === "text-img") {
                    return `
                        <div class="col col-12 col-lg-6">
                            <div class="col"><p class="txt-light">${item.text}</p></div>
                            <div class="col"><img src="${item.src}" class="${item.class} page-media" loading="lazy"></div>
                        </div>
                    `
                }
        
            }).join('');
        
        }).join('');
        
        if (project) {
            infoReplace.classList.add("row");
            mainReplace.classList.add("row");
            replaceTitle.innerHTML = `${project.title}`;
            infoReplace.innerHTML = `
                <div class="col col-12 col-lg-6">
                    <p class="txt-light">About</p>
                    <p class="txt-white">${project.text}</p>
                </div>
                <div class="col col-3"></div>
                <div class="col col-12 col-lg-3">
                    <p class="txt-light">Services</p>
                    <p class="txt-white mb-0">${services}</p>
                </div>
            `;
            mainReplace.innerHTML = `
                ${media}
            `;
            if (window.instgrm?.Embeds) {
                window.instgrm.Embeds.process();
            }
            
        }
        console.log("DONE");
        return;
    }

    // for misc
    function handleClickMisc(){
        const container = document.querySelector(".gallery");

        misc.forEach(file => {

            if (file.endsWith(".webp")) {
                const img = document.createElement("img");
                img.src = `/Portfolio-Content/misc/1/${file}`;
                img.classList.add('gallery-img');
                img.loading = "lazy";
                container.appendChild(img);
                console.log('test');
            } else if (file.endsWith(".mp4")) {
                const vid = document.createElement("video");
                vid.src = `/Portfolio-Content/misc/1/${file}`;
                vid.classList.add('gallery-img');
                vid.autoplay = true;
                vid.muted = true;
                vid.loop = true;
                vid.playsInline = true;
                container.appendChild(vid);
            }
        });
    }
    

    //If page has been preloaded, url hash passed through handleClick()
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === "/work/") {
        handleClick(hash.substring(1));
    } else if (path === "/misc/") {
        handleClickMisc();
    }

    window.onpopstate = function() {
        const path = window.location.pathname;
        const hash = window.location.hash;
        if (path === "/work/") {
            handleClick(hash.substring(1));
        } else if (path === "/misc/") {
            handleClickMisc();
        }
    }
});


