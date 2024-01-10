'use strict';
(()=>{
    let preloaderEl= document.querySelector('div.preloader');
    window.addEventListener('load',()=>{
        preloaderEl.style.display='none';
    });
})();