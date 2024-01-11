'use strict';
(()=>{
    let preloaderEl= document.querySelector('div.preloader');
    let selectoptEl= document.getElementById('selectopt');
    let buyFormDiv=document.querySelector("div.buy-section");
    let sellFormDiv=document.querySelector("div.sell-section");
    let resultDiv=document.querySelector("div.calculated-result");
    window.addEventListener('load',()=>{
        preloaderEl.style.display='none';
    });
    console.log(selectoptEl)
    selectoptEl.addEventListener('change',()=>{
        let selectionElValue=selectoptEl.value;
        if(selectionElValue==='buy'){
            buyFormDiv.style.display='block';
            sellFormDiv.style.display='none';
        }else if(selectionElValue==='sell'){
            buyFormDiv.style.display='none';
            sellFormDiv.style.display='block';
        }
    });
})();