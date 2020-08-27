let cctest = {
    setCookie: (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        try {
                document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
        } catch(err) {
            console.log(err.message);
        }

    },
    getCookie: (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    },
    saveData: {},
    bank: {},
    minigameGoods: {},
    goods: {},
    initializeGoods: {},
    formatPrice: {},
    update: {},
    interval: {},
    container: {},
    drawInterval: {},
    drawLoop: {},
    canvasLastTop: 0,
    canvasLastLeft: 0,
    htmlTemplate: `
<div id="cctest-container" style="position:absolute; left:24px;">
    <style>
        #cctestTable {
            z-index: 10000;
            display: block;
            position: relative;
            color: #fff;
            background-color: rgba(0,0,0,.5);
            text-shadow: black -1px 0px, black 0px 1px, black 1px 0px, black 0px -1px;
            font-weight: bold;
            padding: 2px;
        }
        #cctestTable tr {
            margin-bottom: 1px;
        }
        #cctestTable td {
            width: 32;
        }
        #cctestTable .cctest-low {
            color: #4bf0b8;
        }
        #cctestTable .cctest-cur {
            color: #4bb8f0;
        }
        #cctestTable .cctest-high {
            color: #a358ff;
        }
    </style>
    <table id="cctestTable">
        <tr id="cctest-0" style="opacity:.4">
            <td>CRL</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-1" style="opacity:.4">
            <td>CHC</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-2" style="opacity:.4">
            <td>BTR</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-3" style="opacity:.4">
            <td>SUG</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-4" style="opacity:.4">
            <td>NUT</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-5" style="opacity:.4">
            <td>SLT</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-6" style="opacity:.4">
            <td>VNL</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-7" style="opacity:.4">
            <td>EGG</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-8" style="opacity:.4">
            <td>CNM</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-9" style="opacity:.4">
            <td>CRM</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-10" style="opacity:.4">
            <td>JAM</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-11" style="opacity:.4">
            <td>WCH</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-12" style="opacity:.4">
            <td>HNY</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-13" style="opacity:.4">
            <td>CKI</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-14" style="opacity:.4">
            <td>RCP</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td>
            <td><span class="cctest-bcur"></span></td>
            <td><span class="cctest-cur">$0.00</span></td>
            <td><span class="cctest-acur"></span></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
    </table>
</div>
`
};

document.getElementById('sectionMiddle')
    .insertAdjacentHTML('beforeend', cctest.htmlTemplate);

cctest.initializeGoods = () => {
    cctest.minigameGoods.map((good, id) => {
        cctest.goods[id] = {
            name: good.name,
            bought: 0,
            value: 0,
            low: 1000,
            flow: cctest.formatPrice(1000, false),
            high: 0,
            fhigh: cctest.formatPrice(0, false),
            cur: 0,
            fcur: cctest.formatPrice(0, false),
            profit: 0,
            formattedProfit: cctest.formatPrice(0, true)
        };
    });
};

cctest.bank = Game.ObjectsById[5];
cctest.minigameGoods = cctest.bank.minigame.goodsById;
cctest.goods = Array(cctest.minigameGoods.length);

// Attach position of div to canvas
// This is done this way because putting this table near the canvas breaks
// the draw loop for some reason
let getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
};

cctest.drawLoop = () => {
    if (Game.onMenu != "" || Game.ObjectsById[5].amount == 0)
    if (Game.onMenu != "" || cctest.bank.amount == 0 || cctest.bank.muted || !cctest.bank.onMinigame)
        document.getElementById('cctest-container').style.visibility = 'hidden';
    else
        document.getElementById('cctest-container').style.visibility = 'visible';
    var canvasRect = getOffset(document.getElementById('bankGraph'));
    if (canvasRect.top == cctest.canvasLastTop)
        return;
    
    document.getElementById('cctest-container').style.top = canvasRect.top + 'px';
};
cctest.drawInterval = setInterval(cctest.drawLoop, 10);

cctest.minigameGoods = Game.ObjectsById[5].minigame.goodsById;
cctest.goods = Array(cctest.minigameGoods.length);

cctest.formatPrice = (val, colored) => {
    let money = '$' + val.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    let style = colored ? (val >= 0 ? 'color:#73f21e;' : 'color:#f21e3c;') : "";
    return `<span style="${style}">${money}</span>`;
};

cctest.update = () => {
    if (Game.ObjectsById[5].amount == 0)
        if (cctest.bank.amount == 0)
            cctest.initializeGoods();

    let table = document.getElementById('cctestTable');

    cctest.minigameGoods.map((good, id) => {
        let bought = cctest.goods[id].bought;
        if (good.stock == 0) {
            cctest.goods[id].bought = 0;
            cctest.goods[id].flow = cctest.formatPrice(0, false);
            cctest.goods[id].fhigh = cctest.formatPrice(0, false);
        }
        cctest.goods[id].low = cctest.goods[id].low < good.val ? cctest.goods[id].low : good.val ;
        cctest.goods[id].flow = cctest.formatPrice(cctest.goods[id].low, false);
        cctest.goods[id].high = cctest.goods[id].high > good.val ? cctest.goods[id].high : good.val ;
        cctest.goods[id].fhigh = cctest.formatPrice(cctest.goods[id].high, false);
        cctest.goods[id].cur = good.val;
        cctest.goods[id].fcur = cctest.formatPrice(cctest.goods[id].cur, false);
        cctest.goods[id].profit = (good.val * bought) - (cctest.goods[id].value * bought);
        cctest.goods[id].formattedProfit = cctest.formatPrice(cctest.goods[id].profit, true);
        
        let ratio = (cctest.goods[id].cur-cctest.goods[id].low)/(cctest.goods[id].high-cctest.goods[id].low);
        let bcur= '';
        let acur= '';
        let opac= 0.4;
        if (ratio <0.2){
            bcur='~';
            acur=' ';
            if (bought == 0 && cctest.goods[id].high-cctest.goods[id].low>25)
                opac = 1;
        }
        else {
            if (ratio >0.8){
                bcur=' ';
                acur='~';}
            else {
                bcur=' ';
                acur=' ';
            }
        }
        if (bought > 0 &&  cctest.goods[id].cur > cctest.goods[id].value+10)
            opac = 1;
        
        let row = table.querySelector(`#cctest-${id}`);
        row.style.opacity = opac;
        row.querySelector('.cctest-low').innerHTML = cctest.goods[id].flow;
        row.querySelector('.cctest-bcur').innerHTML = bcur;
        row.querySelector('.cctest-cur').innerHTML = cctest.goods[id].fcur;
        row.querySelector('.cctest-acur').innerHTML = acur;
        row.querySelector('.cctest-high').innerHTML = cctest.goods[id].fhigh;
        row.querySelector('.cctest-profit').innerHTML = cctest.goods[id].formattedProfit;
    });

    let serialized = btoa(JSON.stringify(cctest.goods));
    cctest.setCookie('cctest_data', serialized,180);
}

cctest.initializeGoods();

cctest.minigameGoods.map((good, id) => {
    let buy = (bought) => {
        cctest.goods[id].bought = bought;
        cctest.goods[id].value = bought == 0 ? 0 : good.val;
        cctest.update();
    };

    let buttons = ['1','10','100','Max','-1','-10','-100','-All'];
    buttons.map((b) => {
        let _id = 'bankGood-' + id + '_' + b;
        document.getElementById(_id)
            .addEventListener('click', () => {
                buy(b > good.stock ? b : good.stock);
            });
    });
});

// Load previous numbers
cctest.saveData = cctest.getCookie('cctest_data');

if (cctest.saveData != '')
try {
    cctest.goods = JSON.parse(atob(cctest.saveData));
} catch {
    console.log("Failed to load cctest save data.");
}

cctest.interval = setInterval(cctest.update, 1000);
