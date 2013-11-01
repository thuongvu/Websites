function calendar() {
	// this creates a new instance of the object, date()
	var current = new Date();
	// assigning variables to be methods of the object named current.
	var month = current.getMonth();
	var day = current.getDate();
	var year = current.getFullYear();

	// declare variable that will get the correct month, because months are based on a 0 index
	var tempMonth = month + 1;
	// declaring a new instance of date() object, accepting the arguments tempMonth, 1, and year
	// nope, I take that back.  tempDate is really assigned to "current.getMonth() + 1", so by assigning this, it is telling the date instance to take the current month, shift it 1 month to compensate, and the year
	var tempDate = new Date(tempMonth +' 1,' + year);
	// creating a getDay() method to the new tempDate instance.  this will get a day between 0-6 for the day of the week.  
	var tempWeekDay = tempDate.getDay();
	var tempWeekDay2 = tempWeekDay;
	// i will be working with two copies of this var later on.  so i assign var tempweekday to value of the getDay() method of the object tempDate.  and then tempweekday 2 is assign whatever value is that of tempweekday.  

	// figuring out how many days there are in february
	// remember that array indexes start at 0, not 1
	// if year % 100 is 0, && year % 4 s 0, OR year % 400 is 0, then it's a leap year
	if (month == 1) {
		if ( (year%100!==0) && (year%4==0) || (year%400==0) ) {
		var	totalFeb = 29;
		} else {
		var	totalFeb = 28;
		}
	};

	// creating an array for total amount of days in every month
	var totalDays = ["31", totalFeb , "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
	// different

	// padding is extra space for extra days in a month. eg, the month starts on a thursday.  
	var padding ="";
	// while days of the week is greater than 0, add a new TD (a new table data cell), and every time this is run, take one day off
	while (tempWeekDay > 0) {
		padding+= "<td></td>";
		tempWeekDay--;
	}

	// counter to go through and make a new row after a row is filled.
	// i means you start on day 1 of each month, the counter will start at 1.   
	i = 1; 
	while (i <= totalDays[month]) {
		// if this goes over 7 days, then reset back to 0 for another week, a different row
		if (tempWeekDay2 > 6){
			tempWeekDay2 = 0;
			padding += "</tr><tr>"; // finish off the row, add a new row.
		};
	// now for the current day, assign a different css class than any other day
		if (i == day) {
			padding +="<td class='currentDay'>"+ i + "</td>" 
		} else {
			padding +="<td class='currentMonth'>" + i + "</td>";
		};
	tempWeekDay2++;
	i++;
	};

	// now to put it all in a nice handy dandy table
	// make an array with month names
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", 'Nov', "Dec"];
	// creates a table with monthNames[month] and year at top that stretches the length of the table, 7 th's
	var calendarTable ="<table class='calendar'> <tr class='currentMonth'> <th colspan='7'>" +monthNames[month]+" "+ year +"</th></tr>";
	// display the days of the week on the second row
	calendarTable +="<tr class='weekdays'> <td>Sun</td> <td>Mon</td> <td>Tues</td> <td>Wed</td> <td>Thu</td> <td>Fri</td> <td>Sat</td> </tr>"
	// makes a new row
	calendarTable += "<tr>";
	// adds padding, the variable that adds new td's for each i or a blank tr to fill every row
	calendarTable += padding;
	// closing tags for the table
	calendarTable += "</tr></table>";
	// inserts calendarTable into #calendar
	document.getElementById("calendar").innerHTML=calendarTable;
};