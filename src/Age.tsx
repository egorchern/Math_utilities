import React from 'react';
import "./Age.css";

interface date_difference {
	years: number;
	months: number;
	days: number;
}

function get_formatted_current_date(): string {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	let return_date = `${dd}/${mm}/${yyyy}`;
	return return_date;
}

interface parsed_date{
	day: number,
	month: number,
	year: number
}

function parse_date(date: string): parsed_date{
	let date_fragments = date.split("/");
	let parsed = {
		day: 0,
		month: 0,
		year: 0
	}
	for(let i = 0; i < date_fragments.length; i += 1){
		let date_fragment = date_fragments[i];
		if(i === 0){
			parsed.day = Number(date_fragment);
		}
		else if(i === 1){
			parsed.month = Number(date_fragment);
		}
		else{
			parsed.year = Number(date_fragment);
		}
	}
	return parsed;
	
}

function daysInMonth (month: number, year: number): number {
	return new Date(year, month, 0).getDate();
}

function calculate_date_difference(date1: string, date2: string): date_difference {
	let parsed_date1 = parse_date(date1);
	let parsed_date2 = parse_date(date2);
	let years = parsed_date2.year - parsed_date1.year;
	let months = parsed_date2.month - parsed_date1.month;
	if(months < 0){
		years -= 1;
		months += 12;
	}
	let days = parsed_date2.day - parsed_date1.day;
	if(days < 0){
		months -= 1;
		days += daysInMonth(parsed_date2.month, parsed_date2.year)
	}
	let return_obj = {
		years: years,
		months: months,
		days: days
	}
	
	return return_obj;
}

function get_age_stats(dob: string): date_difference{
	return calculate_date_difference(dob, get_formatted_current_date());
}

interface Age_props {

}
interface Age_state {

}

class Age extends React.Component<Age_props, Age_state>{
	constructor(props: Age_props) {
		super(props);
		this.state = {

		}
		console.log(get_age_stats("23/10/2002"));

	}
	render() {
		return (
			<div>
				<h2>Age calculator</h2>
			</div>
		)
	}
}

export default Age;