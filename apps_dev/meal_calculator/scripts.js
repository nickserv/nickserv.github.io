$(document).ready(function() {
	$('#submit').click(function() {calculateBudget()})
})

//classes
function Quarter(date_start,date_end) {
	this.date_start = date_start
	this.date_end = date_end
}
function Budget(date_start,date_end,debit_total) {
	this.date_start = date_start
	this.date_end = date_end
	this.debit_total = debit_total
}

//data
function Data() {
	this.q_20111  = new Quarter(new Date(2011,9,5), new Date(2011,11,18))
	this.m_10plus = new Budget(this.q_20111.date_start, this.q_20111.date_end, 400.0)
	this.m_12plus = new Budget(this.q_20111.date_start, this.q_20111.date_end, 249.0)
	this.m_14plus = new Budget(this.q_20111.date_start, this.q_20111.date_end, 97.0)
}

//main function
function calculateBudget() {
	alert('test')
	data = new Data()
	//budget
	var meal_plan = $('#meal_plan').val()
	if      (meal_plan=="alldebit")
		{var throwaway = 0}
	else if (meal_plan=="10plus")
		{budget = data.m_10plus}
	else if (meal_plan=="12plus")
		{budget = data.m_12plus}
	else if (meal_plan=="14plus")
		{budget = data.m_14plus}
	else if (meal_plan=="ultra")
		{var throwaway = 0}
	else if (meal_plan=="custom")
		{var throwaway = 0}
	//inputs
	var date_start = $('#date_start').val()
	var date_end = $('#date_start').val()
	var debit_total = $('#debit_total').val()
	var debit_left = $('#debit_left').val()
	//calculations
	var days_left = date_end - Date.today
	var debit_daily = debit_left/days_left
	//ouputs
	$('#display').html(
		"USAGE<br>\
		Time: day "+String(parseInt(Date.today-date_start))+" of "+String(parseInt(date_end-date_start))+" ("+(((Date.today-date_start).to_f)/((date_end-date_start).to_f))*100,false+"%)<br>\
		Spent: "+debit_total-debit_left+" of "+debit_total+" ("+((debit_total-debit_left)/debit_total)*100,false+"%), or "+(debit_total-debit_left)/(Date.today-date_start)+" daily<br><br>\
		RECOMMENDATIONS<br>\
		Spend "+debit_daily+" daily ("+debit_daily*7+" weekly)."
	)
}
