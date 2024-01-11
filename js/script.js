'use strict';
(()=>{
    let preloaderEl= document.querySelector('div.preloader');
    let selectoptEl= document.getElementById('selectopt');
    window.addEventListener('load',()=>{
        preloaderEl.style.display='none';
    });
    
})();