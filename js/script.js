'use strict';
(()=>{
    // selecting all the Element 
    let preloaderEl= document.querySelector('div.preloader');
    let selectoptEl= document.getElementById('selectopt');
    let buyFormDiv=document.querySelector("div.buy-section");
    let sellFormDiv=document.querySelector("div.sell-section");
    let resultDiv=document.querySelector("div.calculated-result");
    let errorDiv= document.querySelector("div.error");
    let sellForm = document.querySelector('div.sell-form form');
    let buyForm = document.querySelector('div.buy-form form');
    errorDiv.textContent='* are Mandatory field.';
    // Handeling PReloader 
    window.addEventListener('load',()=>{
        preloaderEl.style.display='none';
    });
    // Handeling Option Selection 
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
    // Handeling the Sell Calculation 
    console.log(sellForm);
    sellForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        console.log("hello")
    });



    // Handeling the Sell Calculation 
})();