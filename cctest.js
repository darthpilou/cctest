let cctest = {
    setCookie: (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
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
		float: right
        }
        #cctestTable .cctest-progress {
		width: 96px;
	}
        #cctestTable .cctest-high {
		color: #a358ff;
        }
        #cctestTable .cctest-profit {
		float: right
        }
		
		
    </style>
    <table id="cctestTable">
        <tr id="cctest-0" style="opacity:.4">
            <td>CRL</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-1" style="opacity:.4">
            <td>CHC</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-2" style="opacity:.4">
            <td>BTR</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-3" style="opacity:.4">
            <td>SUG</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-4" style="opacity:.4">
            <td>NUT</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-5" style="opacity:.4">
            <td>SLT</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-6" style="opacity:.4">
            <td>VNL</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-7" style="opacity:.4">
            <td>EGG</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-8" style="opacity:.4">
            <td>CNM</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-9" style="opacity:.4">
            <td>CRM</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-10" style="opacity:.4">
            <td>JAM</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-11" style="opacity:.4">
            <td>WCH</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-12" style="opacity:.4">
            <td>HNY</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-13" style="opacity:.4">
            <td>CKI</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
            <td><span class="cctest-high">$0.00</span></td>
            <td><span>|</span></td>
            <td><span class="cctest-profit">$0.00</span></td>
        </tr>
        <tr id="cctest-14" style="opacity:.4">
            <td>RCP</td>
            <td class="cctest-ba"><span class="cctest-low">$0.00</span></td><td>&nbsp;</td>
            <td><div class="cctest-progress"><div class="cctest-bar1"><div class="cctest-bar2">&nbsp;</div></div></div></td>
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
            lowval: 1000,
            highval: 0,
            bought: 0,
            value: 0,
            profit: 0,
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

cctest.formatPrice = (val, colored) => {
    let money = "";
    let style = "" ;
    if(colored == true) {
        let mval = val/1000;
	money = Math.abs(mval).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "k";
	style = val >= 0 ? 'color:#73f21e;' : 'color:#f21e3c;' ;
    }
    else {
	money = val.toFixed(1).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	style = "";
    }

    return `<span style="${style}">${money}</span>`;
};

cctest.updateDisplay = (good,id) => {
	let row = document.getElementById('cctestTable').querySelector(`#cctest-${id}`);
	let low = row.querySelector('.cctest-low');
	let high = row.querySelector('.cctest-high');
	let progress = row.querySelector('.cctest-progress');
	let bar1 = row.querySelector('.cctest-bar1');
	let bar2 = row.querySelector('.cctest-bar2');
	let profit = row.querySelector('.cctest-profit');

	let curgood = cctest.goods[id];
	let range = curgood.highval-curgood.lowval;
	let ratio = (good.val-curgood.lowval)/(curgood.highval-curgood.lowval);

	let width1 = 0;
	let width2 = 0;
	let color1 = "";
	let color2 = "";
	let colorprog = "transparent";
	let alignleft = "&nbsp;&nbsp;&nbsp;";
	let alignright = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	let offset = "";
	let opac= 0.1;
	let rowback = "transparent";
	let profitHTML = "";

	let buy = (b) => {
		curgood.bought = b;
		curgood.value = b == 0 ? 0 : good.val;
	};

	if(ratio < 0.5) 
		offset = alignright;
	else
		offset = alignleft;
	
	if (curgood.bought==0) {
		width1 = (good.val-curgood.lowval)/range*100;
		width2 = 100-500/(width1+0.001);
		color2 = "#0f141a";
		colorprog = "#405068";
		
		opac = 1-ratio;
		let red = Math.round(255*ratio);
		let green = Math.round(255*opac);
		color1 = "rgb(" + red.toFixed(0) + "," + green.toFixed(0)  + ", 0)";
		if(range<30 || opac<0.1)
			opac=0.1;
		if(ratio < 0.25 && range>30) {
			rowback = "#3333FF"; 
			let _id = 'bankGood-'+ id +'_Max';
			document.getElementById(_id).click();
    			console.log("Bought " + cctest.goods[id].name + " for " + good.val);
		}
	}
	else {
		opac = 0.3;
		color2 = "#405068";
		profitHTML = cctest.formatPrice(curgood.profit,true);
		if(curgood.value>good.val) {
			width1 = (curgood.value-curgood.lowval)/range*100;
			width2 = (good.val-curgood.lowval)/(curgood.value-curgood.lowval)*100;
			color1 = "#f21e3c";
		}
		else {
			opac = 0.5;
			width1 = (good.val-curgood.lowval)/range*100;
			width2 = (curgood.value-curgood.lowval)/(good.val-curgood.lowval)*100;
			color1 = "#73f21e";
			if (ratio > 0.5) {
				opac = 1;
				rowback = "#9933FF";
				let _id = 'bankGood-'+ id +'_-All';
				document.getElementById(_id).click();
    				console.log("Sold " + cctest.goods[id].name + " for " + good.val);
			}
		}
	}
	
	row.style.background = rowback;
	row.style.opacity = opac;
	progress.style.background = colorprog;	
	bar1.style.width = width1.toFixed(0) + "%";	
	bar1.style.background = color1;	
	bar2.style.width = width2.toFixed(0) + "%";	
	bar2.style.background = color2;	
	bar2.innerHTML = offset + cctest.formatPrice(good.val,false);
	low.innerHTML = cctest.formatPrice(curgood.lowval, false);
	high.innerHTML = cctest.formatPrice(curgood.highval, false);
	profit.innerHTML = profitHTML;
};

cctest.update = () => {
    if (cctest.bank.amount == 0)
        cctest.initializeGoods();
		cctest.minigameGoods.map((good, id) => {
        let bought = cctest.goods[id].bought;
        if (good.stock == 0)
            cctest.goods[id].bought = 0;
        cctest.goods[id].profit = (good.val * bought) - (cctest.goods[id].value * bought);
        cctest.goods[id].lowval = good.val < cctest.goods[id].lowval ? good.val : cctest.goods[id].lowval;
        cctest.goods[id].highval = good.val > cctest.goods[id].highval ? good.val : cctest.goods[id].highval;

		cctest.updateDisplay(good,id);
    });

    let serialized = btoa(JSON.stringify(cctest.goods));
    cctest.setCookie('cctest_Data', serialized);
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
cctest.saveData = cctest.getCookie('cctest_Data');

if (cctest.saveData != '')
try {
    cctest.goods = JSON.parse(atob(cctest.saveData));
} catch {
    console.log("Failed to load cctest save data.");
}

cctest.interval = setInterval(cctest.update, 1000);
