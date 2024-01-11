'use strict';
(()=>{
    // selecting all the Element 
    let preloaderEl= document.querySelector('div.preloader');
    let selectoptEl= document.getElementById('selectopt');
    let buyFormDiv=document.querySelector("div.buy-section");
    let sellFormDiv=document.querySelector("div.sell-section");
    let resultDiv=document.querySelector("div.calculated-result");
    let errorDiv= document.querySelectorAll("div.error");
    let sellForm = document.querySelector('div.sell-form form');
    let buyForm = document.querySelector('div.buy-form form');

    // Defining Constatn variable
    const Dpcharge=25;
    const sebonFeePercentage=0.015;
    // Handeling PReloader 
    window.addEventListener('load',()=>{
        preloaderEl.style.display='none';
    });
    // Handeling Form Display
    let formDisp=()=>{
            let selectionElValue=selectoptEl.value;
            errorDiv[0].textContent='';
            errorDiv[1].textContent='';
            if(selectionElValue==='buy'){
                buyFormDiv.style.display='block';
                sellFormDiv.style.display='none';
            }else if(selectionElValue==='sell'){
                buyFormDiv.style.display='none';
                sellFormDiv.style.display='block';
            }
    };
    // Buy Amt Calculation
    let buyAmtCalculation=(buyprice,quantity)=>{
        let total= buyprice*quantity;
        let sebonfee= (total*sebonFeePercentage)/100;
        let BrokerCharge=10;
                if(total<=50000){
                    BrokerCharge=total*0.4/100;
                    if(BrokerCharge<10){
                        BrokerCharge=10;
                    }
                }else if(total>50000 && total<=500000){
                    BrokerCharge=total*0.37/100;
                }else if(totalSebonFee>500000 && total<=2000000){
                    BrokerCharge=total*0.34/100;
                }else if(total>2000000 && total<=10000000){
                    BrokerCharge=total*0.30/100;
                }else if(total>10000000){
                    BrokerCharge=total*0.27/100;
                }
        
        return (total+BrokerCharge+Dpcharge+sebonfee);

    };
    // Handeling Option Selection 
    selectoptEl.addEventListener('change',formDisp);
    // Handeling the Sell Calculation 
    sellForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        let sellprice=parseFloat(sellForm.sellprice.value);
        let buyprice=parseFloat(sellForm.buyprice.value);
        let quantity=parseFloat(sellForm.quantity.value);
        let taxpercent=parseFloat(sellForm.tax.value);
        if(sellprice && buyprice && quantity && taxpercent){
            if(sellprice<0 && buyprice<0 && quantity<0){
                errorDiv[0].textContent='Invalid Data';
            }else{
                console.log(sellprice,buyprice,quantity,taxpercent);
                let totalSellAmt= sellprice*quantity;
                let totalBuyAmt= buyAmtCalculation(buyprice,quantity);
                let totalSebonFee= ((totalSellAmt*sebonFeePercentage)/100).toFixed(2);
                let BrokerCharge=10;
                let capitalgaintax=0;
                if(totalSellAmt<=50000){
                    BrokerCharge=totalSellAmt*0.4/100;
                    if(BrokerCharge<10){
                        BrokerCharge=10;
                    }
                }else if(totalSellAmt>50000 && totalSellAmt<=500000){
                    BrokerCharge=totalSellAmt*0.37/100;
                }else if(totalSellAmt>500000 && totalSellAmt<=2000000){
                    BrokerCharge=totalSellAmt*0.34/100;
                }else if(totalSellAmt>2000000 && totalSellAmt<=10000000){
                    BrokerCharge=totalSellAmt*0.30/100;
                }else if(totalSellAmt>10000000){
                    BrokerCharge=totalSellAmt*0.27/100;
                }
                BrokerCharge=BrokerCharge.toFixed(2);
                let receivableamount=totalSellAmt-Dpcharge-totalSebonFee-BrokerCharge;
                let profit_loss= (receivableamount-totalBuyAmt);
                if(profit_loss>0){
                    capitalgaintax=(profit_loss*taxpercent/100).toFixed(2);
                }
                let actualprofit= (profit_loss-capitalgaintax).toFixed(2);

                let Result=`
                <div class="result-wrapper">
                <h2>Calculated Share Result:</h2>
                <p>Total Sell Value : <span> ${totalSellAmt} </span> </p>
                <p>Dp Charge: <span> 25 </span> </p>
                <p>Sebon Fee: <span> ${totalSebonFee} </span> </p>
                <p>Broker Commission : <span> ${BrokerCharge} </span> </p>
                <p>Capital Gain Tax: <span> ${capitalgaintax} </span> </p>
                <p>Profit/Loss: <span> ${actualprofit} </span> </p>
                <p>Return on Investment : <span> ${((actualprofit / totalBuyAmt) * 100).toFixed(2)} %</span> </p>
                <hr>
                <p>Total Receivable Amount: <span> ${receivableamount} </span> </p>
              </div>
            </div>
                `;
                resultDiv.innerHTML=Result;

            }
            // let profit= (sellprice-buyprice)*quantity;
            // let tax= (profit*taxpercent)/100;
            // let totalprofit= profit-tax;
            // resultDiv.textContent=`Your Total Profit is ${totalprofit}`;
        }else{
            errorDiv[0].textContent='* Are Mandatory field.';
        }
    });



    // Handeling the Buy Calculation 
    buyForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        let buyprice=parseFloat(buyForm.buyprice.value);
        let quantity=parseFloat(buyForm.quantity.value);
        console.log(buyprice,quantity)
        if(buyprice && quantity){
            if(buyprice<0 && quantity<0){
                errorDiv[1].textContent='Invalid Data';
            }
            console.log(buyprice,quantity);
            // let total= buyprice*quantity;
            // resultDiv.textContent=`Your Total is ${total}`;
        }else{
            errorDiv[1].textContent='* Are Mandatory field.';
        }
    });
    // calling the Form Display
    formDisp();
})();