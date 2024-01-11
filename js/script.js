'use strict';
(() => {
    // selecting all the Element 
    let preloaderEl = document.querySelector('div.preloader');
    let selectoptEl = document.getElementById('selectopt');
    let buyFormDiv = document.querySelector("div.buy-section");
    let sellFormDiv = document.querySelector("div.sell-section");
    let resultDiv = document.querySelector("div.calculated-result");
    let errorDiv = document.querySelectorAll("div.error");
    let sellForm = document.querySelector('div.sell-form form');
    let buyForm = document.querySelector('div.buy-form form');

    // Defining Constatn variable
    const Dpcharge = 25;
    const sebonFeePercentage = 0.015;
    // Handeling PReloader 
    window.addEventListener('load', () => {
        preloaderEl.style.display = 'none';
    });
    // Handeling Form Display
    let formDisp = () => {
        let selectionElValue = selectoptEl.value;
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
        errorDiv[0].textContent = '';
        errorDiv[1].textContent = '';
        if (selectionElValue === 'buy') {
            buyFormDiv.style.display = 'block';
            sellFormDiv.style.display = 'none';
        } else if (selectionElValue === 'sell') {
            buyFormDiv.style.display = 'none';
            sellFormDiv.style.display = 'block';
        }
    };
    //Calculating Broker Charge
    const brokerChargeCalculation = (totalamount) => {
        let BrokerCharge = 10;
        if (totalamount <= 50000) {
            BrokerCharge = totalamount * 0.4 / 100;
            if (BrokerCharge < 10) {
                BrokerCharge = 10;
            }
        } else if (totalamount > 50000 && totalamount <= 500000) {
            BrokerCharge = totalamount * 0.37 / 100;
        } else if (totalamount > 500000 && totalamount <= 2000000) {
            BrokerCharge = totalamount * 0.34 / 100;
        } else if (totalamount > 2000000 && totalamount <= 10000000) {
            BrokerCharge = totalamount * 0.30 / 100;
        } else if (totalamount > 10000000) {
            BrokerCharge = totalamount * 0.27 / 100;
        }
        return Number(BrokerCharge.toFixed(2));
    };
    // Buy Amt Calculation
    let buyAmtCalculation = (buyprice, quantity) => {
        let total = buyprice * quantity;
        let sebonfee = (total * sebonFeePercentage) / 100;
        let BrokerCharge = brokerChargeCalculation(total);
        console.log(total, sebonfee, BrokerCharge)
        return (total + BrokerCharge + Dpcharge + sebonfee);

    };
    // Handeling Option Selection 
    selectoptEl.addEventListener('change', formDisp);
    // Handeling the Sell Calculation 
    sellForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let sellprice = parseFloat(sellForm.sellprice.value);
        let buyprice = parseFloat(sellForm.buyprice.value);
        let quantity = parseFloat(sellForm.quantity.value);
        let taxpercent = parseFloat(sellForm.tax.value);
        if (sellprice && buyprice && quantity && taxpercent) {
            if (sellprice < 0 && buyprice < 0 && quantity < 0) {
                errorDiv[0].textContent = 'Invalid Data';
            } else {
                console.log(sellprice, buyprice, quantity, taxpercent);
                let totalSellAmt = sellprice * quantity;
                let totalBuyAmt = buyAmtCalculation(buyprice, quantity);
                let totalSebonFee = ((totalSellAmt * sebonFeePercentage) / 100).toFixed(2);
                let BrokerCharge = brokerChargeCalculation(totalSellAmt);
                let capitalgaintax = 0;

                let receivableamount = totalSellAmt - Dpcharge - totalSebonFee - BrokerCharge;
                console.log(receivableamount, totalBuyAmt)
                let profit_loss = (receivableamount - totalBuyAmt);
                if (profit_loss > 0) {
                    capitalgaintax = (profit_loss * taxpercent / 100).toFixed(2);
                }
                let actualprofit = (profit_loss - capitalgaintax).toFixed(2);
                receivableamount = (receivableamount - capitalgaintax).toFixed(2);

                let Result = `
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
            </div>`;
                resultDiv.style.display = 'block';

                resultDiv.innerHTML = Result;

            }
        } else {
            errorDiv[0].textContent = '* Are Mandatory field.';
        }
    });



    // Handeling the Buy Calculation 
    buyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let buyprice = parseFloat(buyForm.buyprice.value);
        let quantity = parseFloat(buyForm.quantity.value);
        console.log(buyprice, quantity)
        if (buyprice && quantity) {
            if (buyprice < 0 && quantity < 0) {
                errorDiv[1].textContent = 'Invalid Data';
            } else {
                let totalbuyamount = buyprice * quantity;
                let total = buyAmtCalculation(buyprice, quantity);
                let totalSebonFee = ((totalbuyamount * sebonFeePercentage) / 100).toFixed(2);
                let BrokerCharge = brokerChargeCalculation(totalbuyamount);

                let Result = `
                <div class="result-wrapper">
                <h2>Calculated Share Result:</h2>
                <p>Total Buy Amount : <span> ${totalbuyamount} </span> </p>
                <p>Dp Charge: <span> 25 </span> </p>
                <p>Sebon Fee: <span> ${totalSebonFee} </span> </p>
                <p>Broker Commission : <span> ${BrokerCharge} </span> </p>
                <hr>
                <p>Total Payable Amount: <span> ${total} </span> </p>
              </div>
            </div>`;
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = Result;
            }
        } else {
            errorDiv[1].textContent = '* Are Mandatory field.';
        }
    });
    // calling the Form Display
    formDisp();
})();