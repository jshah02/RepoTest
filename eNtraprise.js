function f_Menu() {
	theform.action = 'MenuPermitAndInspection.jsp';
	theform.submit();
   	return;
}

function f_submit(argUrl) {
	theform.action = argUrl
 	theform.target = '_top';
 	theform.submit();
}

function trim(str)
{
   return str.replace(/^\s*|\s*$/g,"");
}

var top_v, left_v, screenH = window.screen.height, x;
var vWinCal = true;

function entrCalendar(str_target, str_datetime, event) {
	var browser=navigator.appName;

    left_v = event.clientX;
	top_v = event.clientY + 70;
	x = screenH - top_v;
		
	if (x < 232) top_v = screenH - 232;
	if (!vWinCal.closed && vWinCal.location) vWinCal.close();

	show_calendar(str_target, str_datetime);	
}

function show_calendar(str_target, str_datetime) {	
	var arr_months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
	var week_days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	var n_weekstart = 0; // day week starts from (normally 0 or 1)

	str_datetime = convertDateFormat(str_datetime);

	var dt_datetime = (str_datetime == null || str_datetime =="" ?  new Date() : str2dt(str_datetime));
	var dt_prev_month = new Date(dt_datetime);
	dt_prev_month.setMonth(dt_datetime.getMonth()-1);
	var dt_next_month = new Date(dt_datetime);
	dt_next_month.setMonth(dt_datetime.getMonth()+1);
	var dt_firstday = new Date(dt_datetime);
	dt_firstday.setDate(1);
	dt_firstday.setDate(1-(7+dt_firstday.getDay()-n_weekstart)%7);
	var dt_lastday = new Date(dt_next_month);
	dt_lastday.setDate(0);
	
	// html generation (feel free to tune it for your particular application)
	// print calendar header
	var str_buffer = new String (
		"<html>\n"+
		"<head>\n"+
		"	<title>Calendar</title>\n"+
		"</head>\n"+
		"<body bgcolor=\"White\" >\n"+
		"<table class=\"clsOTable\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n"+
		"<tr><td bgcolor=\"#4682B4\">\n"+
		"<table cellspacing=\"1\" cellpadding=\"3\" border=\"0\" width=\"100%\">\n"+
		"<tr>\n	<td bgcolor=\"#4682B4\"><a href=\"javascript:window.opener.show_calendar('"+
		str_target+"', '"+ dt2dtstr(dt_prev_month)+"'," + top_v + "," + left_v + ");\">"+
		"<img src=\"../images/prev.gif\" width=\"16\" height=\"16\" border=\"0\""+
		" title=\"previous month\"></a></td>\n"+
		"	<td bgcolor=\"#4682B4\" colspan=\"5\">"+
		"<font color=\"white\" face=\"verdana\" size=\"1\">"
		+arr_months[dt_datetime.getMonth()]+" "+dt_datetime.getFullYear()+"</font></td>\n"+
		"	<td bgcolor=\"#4682B4\" align=\"right\"><a href=\"javascript:window.opener.show_calendar('"
		+str_target+"', '"+dt2dtstr(dt_next_month)+"'," + top_v + "," + left_v + ");\">"+
		"<img src=\"../images/next.gif\" width=\"16\" height=\"16\" border=\"0\""+
		" title=\"next month\"></a></td>\n</tr>\n"
	);

	var dt_current_day = new Date(dt_firstday);
	// print weekdays titles
	str_buffer += "<tr>\n";
	for (var n=0; n<7; n++)
		str_buffer += "	<td bgcolor=\"#87CEFA\">"+
		"<font color=\"white\" face=\"verdana\" size=\"1\">"+
		week_days[(n_weekstart+n)%7]+"</font></td>\n";
	// print calendar table
	str_buffer += "</tr>\n";
	while (dt_current_day.getMonth() == dt_datetime.getMonth() ||
		dt_current_day.getMonth() == dt_firstday.getMonth()) {
		// print row heder
		str_buffer += "<tr>\n";
		for (var n_current_wday=0; n_current_wday<7; n_current_wday++) {
				if (dt_current_day.getDate() == dt_datetime.getDate() &&
					dt_current_day.getMonth() == dt_datetime.getMonth())
					// print current date
					str_buffer += "	<td bgcolor=\"#FFB6C1\" align=\"right\">";
				else if (dt_current_day.getDay() == 0 || dt_current_day.getDay() == 6)
					// weekend days
					str_buffer += "	<td bgcolor=\"#DBEAF5\" align=\"right\">";
				else
					// print working days of current month
					str_buffer += "	<td bgcolor=\"white\" align=\"right\">";

				if (dt_current_day.getMonth() == dt_datetime.getMonth())
					// print days of current month
					str_buffer += "<a href=\"javascript:window.opener."+str_target+
					".value='"+dt2dtstr(dt_current_day)+"'; window.close();\">"+
					"<font color=\"black\" face=\"tahoma, verdana\" size=\"1\">";
				else 
					// print days of other months
					str_buffer += "<a href=\"javascript:window.opener."+str_target+
					".value='"+dt2dtstr(dt_current_day)+"'; window.close();\">"+
					"<font color=\"gray\" face=\"verdana\" size=\"1\">";
				str_buffer += dt_current_day.getDate()+"</font></a></td>\n";
				dt_current_day.setDate(dt_current_day.getDate()+1);
		}
		// print row footer
		str_buffer += "</tr>\n";
	}
	// print calendar footer
	str_buffer +=
		"<form name=\"cal\">\n<tr><td colspan=\"7\" bgcolor=\"#87CEFA\">"+
		"<font color=\"White\" face=\"tahoma, verdana\" size=\"1\"></form>\n" +
		"</table>\n" +
		"</tr>\n</td>\n</table>\n" +
		"</body>\n" +
		"</html>\n";
	vWinCal = window.open("", "Calendar", "width=200,height=180,status=no,resizable=no,top=" + top_v + ",left=" + left_v);
	var calc_doc = vWinCal.document;
	calc_doc.write (str_buffer);
	calc_doc.close();
}

function str2dt (str_datetime) {
	var re_date = /^(\d+)\-(\d+)\-(\d+)+$/;
	if (!re_date.exec(str_datetime))
		return alert("Invalid Datetime format: "+ str_datetime);
	return (new Date (RegExp.$3, RegExp.$2-1, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6));
}

function dt2dtstr (dt_datetime) {
	var month_v = "";

    if (dt_datetime.getMonth()+1 == 1) {
	  month_v = "Jan";
	} 
	else if (dt_datetime.getMonth()+1 == 2) {
	  month_v = "Feb";
	}
	else if (dt_datetime.getMonth()+1 == 3) {
	  month_v = "Mar";
	}
	else if (dt_datetime.getMonth()+1 == 4) {
	  month_v = "Apr";
	}
	else if (dt_datetime.getMonth()+1 == 5) {
	  month_v = "May";
	}
	else if (dt_datetime.getMonth()+1 == 6) {
	  month_v = "Jun";
	}
	else if (dt_datetime.getMonth()+1 == 7) {
	  month_v = "Jul";
	}
	else if (dt_datetime.getMonth()+1 == 8) {
	  month_v = "Aug";
	}
	else if (dt_datetime.getMonth()+1 == 9) {
	  month_v = "Sep";
	}
	else if (dt_datetime.getMonth()+1 == 10) {
	  month_v = "Oct";
	}
	if (dt_datetime.getMonth()+1 == 11) { 
	  month_v = "Nov";
	}
	else if (dt_datetime.getMonth()+1 == 12) {
	  month_v = "Dec";
	}
	
	return (new String (month_v + " " + (dt_datetime.getDate()) + ", " + dt_datetime.getFullYear()));
}

function dt2tmstr (dt_datetime) {
	return (new String (dt_datetime.getHours()+":"+dt_datetime.getMinutes()+":"+dt_datetime.getSeconds()));
}

function convertDateFormat(dateArg) {

	if (dateArg.length >= 11) { 
		var month_v = "";
		var indx = dateArg.indexOf(",");
		var day_v = dateArg.substr(4,indx-4);
		var year_v = dateArg.substr(indx+2);
		var found = true;
	
		if (dateArg.substr(0,3) == "Jan") {
		  month_v = "1";
		}
		else if (dateArg.substr(0,3) == "Feb") {
		  month_v = "2"; 
		}
		else if (dateArg.substr(0,3) == "Mar") {
		  month_v = "3"; 
		}
		else if (dateArg.substr(0,3) == "Apr") {
		  month_v = "4"; 
		}
		else if (dateArg.substr(0,3) == "May") {
		  month_v = "5"; 
		}
		else if (dateArg.substr(0,3) == "Jun") {
		  month_v = "6"; 
		}
		else if (dateArg.substr(0,3) == "Jul") {
		  month_v = "7"; 
		}
		else if (dateArg.substr(0,3) == "Aug") {
		  month_v = "8"; 
		}
		else if (dateArg.substr(0,3) == "Sep") {
		  month_v = "9";
		}
		else if (dateArg.substr(0,3) == "Oct") {
		  month_v = "10";
		}
		else if (dateArg.substr(0,3) == "Nov") {
		  month_v = "11";
		}
		else if (dateArg.substr(0,3) == "Dec") {
		  month_v = "12";
		}
		else {
			found = false;
		}
		
		if (found) dateArg = day_v + "-" + month_v + "-" + year_v;
	}

    return(dateArg);
}

function f_checkDate(ctrl) {
   if (ctrl.value > " ") {
     if (parseDate(ctrl.value) == null) {
        alert('Invalid Date. The value is not compatible with any standard date format.');
        ctrl.value = '';
        ctrl.focus();
        return;
     } else {
        ctrl.value = dt2dtstr(parseDate(ctrl.value));
     }
   }
}
