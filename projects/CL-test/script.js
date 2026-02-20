function adjustRow(){
    var viewportWidth = window.innerWidth;
    var breakpoint = 1000;
    const rows = document.querySelectorAll('.row');

    console.log(viewportWidth);
    if (viewportWidth <= breakpoint){
        rows.forEach(row => {
            row.classList.remove('row-cols-4');
            row.classList.add('row-cols-2');
        })
    } else {
        console.log('test');
        rows.forEach(row => {
            row.classList.add('row-cols-4');
            row.classList.remove('row-cols-2');
        })
    }
}

adjustRow();
window.addEventListener("resize", adjustRow)