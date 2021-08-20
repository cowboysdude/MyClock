/* Magic Mirror
 * Module: MyClock
 *
 *
 * Cowboysdude
 */

Module.register("MyClock", {
    defaults: {
		updateInterval: 1 * 60 * 1000,
		reflect: false
    },
    wrapper:null,
    clock:null,
    digits : {},
    positions : ['h1', 'h2', 'm1', 'm2', 's1', 's2'],
    digit_to_name : 'zero one two three four five six seven eight nine'.split(' '),
    weekday_names : 'MON TUE WED THU FRI SAT SUN'.split(' '),
    weekday_holder:null,
    weekdays:null,
    ampm:null,
    alarm:null,

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
        // only create the content once
		if(!wrapper){
    		var wrapper = document.createElement("div");

    		var ti = document.createElement('div');
            ti.innerHTML = `<div id="clock" class="light">
    			<div class="display">
    				<div class="weekdays"></div>
    				<div class="ampm"></div>
    				<div class="alarm"></div>
    				<div class="digits">
                        <span id="h1" class="d1">H</span>
                        <span id="h2" class="d2">H</span>
                        <span id="c1" class="dots">:</span>
                        <span id="m1" class="d3">M</span>
                        <span id="m2" class="d4">M</span>
                        <span id="c2" class="dots">:</span>
                        <span id="s1" class="d5">S</span>
                        <span id="s2" class="d6">S</span>
                    </div>
    			</div>
    		</div>`
            wrapper.appendChild(ti);
            // Schedule this clock time handler to be run again in 1 sec
            setInterval(()=>{this.update_time()}, 1000);
        }
        return wrapper;
	},
    setup(){
        // if the clock is in the dom
    	if(this.clock = document.querySelector('#clock')){
            // get its sub  parts
            this.alarm = clock.querySelector('.alarm')
            this.ampm = clock.querySelector('.ampm')

            // Generate the digits with the needed markup,
            // and add them to the clock

            // find the clock
            let digit_holder = clock.querySelector(".digits");

            let i=1
            // find each digit
            this.positions.forEach((position)=>{
                // find the
                var pos = digit_holder.querySelector('#'+position);

                // Set the digits as key:value pairs in the digits object
                this.digits[position] = pos;
            });

            // Add the weekday names

            this.weekday_holder = clock.querySelector(".weekdays");

            this.weekday_names.forEach((name)=>{
                this.weekday_holder.insertAdjacentHTML("beforeend","<span id=\""+name+"\">" + name + "</span>");
            });

            this.weekdays = clock.querySelector(".weekdays");
        }

    },
    // Run a timer every second and update the clock

    update_time(){

        if(this.clock==null){
            this.setup()
        }
        // if setup was successful
        if(this.clock){
            // Use moment.js to output the current time as a string
            // hh is for the hours in 12-hour format,
            // mm - minutes, ss-seconds (all with leading zeroes),
            // d is for day of week and A is for AM/PM

            var now = moment().format("hhmmssdA");

            // show digits of time
            // only change what is needed, reduce dom change cycles
            for(let i in this.positions){
                let k = this.positions[i]
                if (this.digits[k].innerText!==now[i])
                    this.digits[k].innerText=now[i]
            }

            // The library returns Sunday as the first day of the week.
            // Stupid, I know. Lets shift all the days one position down,
            // and make Sunday last

            var dow = now[6];
            dow--;

            // Sunday!
            if(dow < 0){
                // Make it last
                dow = 6;
            }

            // Mark the active day of the week
            // find the active day of week
            // a span by day in the weekdays span
            let activenow=this.weekdays.querySelector('.active')
            // first time thru, nobody is set active yet
            if(activenow){
                // if the active day of week is different than expected
                if(activenow['id']!==this.weekday_names[dow])
                    // remove the class
                    activenow.classList.remove("active")
            }
            // add the active to appropriate day (using the span ID),
            // ok if already set
            this.weekdays.querySelector("#"+this.weekday_names[dow]).classList.add("active")


            // Set the am/pm text:
            // only change if not correct (or not present)
            if(this.ampm.innerText!==now.slice(7))
                this.ampm.innerText=now.slice(7) //now[7]+now[8]);
        }

    }

});
