/* Magic Mirror
 * Module: MyClock
 *
 *
 * Cowboysdude
 */

Module.register("MyClock", {
    defaults: {
		reflect: true
    },

    start: function() {
        Log.info("Starting module: " + this.name);
    },

    getStyles: function() {
	  return ["MyClock.css"];
    },

     getScripts: function() {
        return ["moment.js"]
    },
	
    getDom: function() {
        var wrapper = document.createElement("div");
        
        setInterval(function() { 
            var hourEle = document.getElementById("hrMin");
            var dt = new Date();
            hourEle.innerHTML = (dt.getHours() % 12 || 12) + ":" + toTwoDigit(dt.getMinutes()) + ":" + toTwoDigit(dt.getSeconds()) + (dt.getHours() / 12 > 1 ? " p" : " a") + "m";
            var d = dt.toString().slice(0, 15);
           }, 1000);
		
		function toTwoDigit(num) {
            return (num < 10 ? "0" : "") + num;
        };
		
		var day = new Date();
        var New_Day = day.getDay();
					 
		var Today_Moment = moment().format('d');
		
		var Time_ = (this.config.reflect == false) ? `<div id="clock"><div id="hrMin"></div></div>`: `<div id="clock" class="reflect"><div id="hrMin"></div></div>`;
		var Sund = (0 == New_Day.toString())? "<span id = 'highlighted'>Sun</span>" : "<span id ='number'>Sun</span>";
		var Mond = (1 == New_Day.toString())? "<span id = 'highlighted'>Mon</span>" : "<span id ='number'>Mon</span>";
		var Tues = (2 == New_Day.toString())? "<span id = 'highlighted'>Tue</span>" : "<span id ='number'>Tue</span>";
		var Wedn = (3 == New_Day.toString())? "<span id = 'highlighted'>Wed</span>" : "<span id ='number'>Wed</span>";
		var Thur = (4 == New_Day.toString())? "<span id = 'highlighted'>Thu</span>" : "<span id ='number'>Thu</span>";
		var Frid = (5 == New_Day.toString())? "<span id = 'highlighted'>Fri</span>" : "<span id ='number'>Fri</span>";
		var Satu = (6 == New_Day.toString())? "<span id = 'highlighted'>Sat</span>" : "<span id ='number'>Sat</span>";
		
		var Date_ = Mond + Tues + Wedn + Thur + Frid + Satu + Sund;
		
		var da = document.createElement(null);
		da.classList.add("bright");
        da.innerHTML = Date_ + Time_;
        wrapper.appendChild(da); 

        return wrapper;
		
		 
    },
});
