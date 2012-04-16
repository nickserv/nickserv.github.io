# RIT Meal Plan Budget Calculator by Nicolas McCurdy (http://thenickperson.com)
# RIT debit display: https://eservices.rit.edu/eServices/login.do
# RIT meal plans: http://finweb.rit.edu/diningservices/mealplans/1112/resident.html

# TODO
# clean code
# make sure date differences aren't 1 off (test with small date ranges)
# make sure custom budget works
# mess around with the text display

#requirements
require "date"
#STDOUT.flush uncomment this if things screw up

#classes
class Quarter
	attr_accessor :date_start, :date_end
	def initialize(date_start,date_end)
		@date_start = date_start
		@date_end = date_end
	end
end
class Budget
	attr_accessor :date_start, :date_end, :money_total
	def initialize(date_start,date_end,money_total)
		@date_start = date_start
		@date_end = date_end
		@money_total = money_total
	end
end

def round(number,cash=true)
	if cash
		return "$"+((number*10**2).round.to_f/10**2).to_s
	else
		return ((number*10**2).round.to_f/10**2).to_s
	end
end

#main function
def calculateBudget()
	#budget
	puts "What is your current RIT meal plan? Type 10, 12, 14, or ultra. If you want to track a budget for something else, type other."
	print "Meal plan: "
	budget_current = gets.chomp
	if budget_current == "10"
		budget_current = $m10plus
		budget_custom = false
	elsif budget_current == "12"
		budget_current = $m12plus
		budget_custom = false
	elsif budget_current == "14"
		budget_current = $m14plus
		budget_custom = false
	else
		budget_custom = true
	end
	#inputs
	if budget_custom
		print "Start date of budget in the format yyyy, mm, dd: "
		date_start_input = gets.chomp
		date_start = Date.strptime("{#{date_start_input}}", "{ %Y, %m, %d }")
		print "End date of budget in the format yyyy, mm, dd: "
		date_end_input = gets.chomp
		date_end = Date.strptime("{#{date_end_input}}", "{ %Y, %m, %d }")
		print "Money total in budget: $"
		money_total = gets.chomp.to_f
		print "Money left in budget: $"
		money_left = gets.chomp.to_f
	else
		date_start = budget_current.date_start
		date_end = budget_current.date_end
		money_total = budget_current.money_total
		print "Money left in budget: $"
		money_left = gets.chomp.to_f
	end
	#calculations
	days_left = date_end - Date.today
	money_daily = money_left/days_left
	#ouputs
	puts ""
	puts "USAGE"
	puts "Time: day #{(Date.today-date_start).to_i.to_s} of #{(date_end-date_start).to_i.to_s} (#{round((((Date.today-date_start).to_f)/((date_end-date_start).to_f))*100,false)}%)"
	puts "Spent: #{round(money_total-money_left)} of #{round(money_total)} (#{round(((money_total-money_left)/money_total)*100,false)}%), or #{round((money_total-money_left)/(Date.today-date_start))} daily"
	puts ""
	puts "RECOMMENDATIONS"
	puts "Spend #{round(money_daily)} daily (#{round(money_daily*7)} weekly)."
end

#data
$q20111 = Quarter.new(Date.new(2011,9,5),Date.new(2011,11,18))
$m10plus = Budget.new($q20111.date_start,$q20111.date_end,400.0)
$m12plus = Budget.new($q20111.date_start,$q20111.date_end,249.0)
$m14plus = Budget.new($q20111.date_start,$q20111.date_end,97.0)

calculateBudget()
