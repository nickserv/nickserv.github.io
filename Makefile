# Run linters on the source code
lint: jslint csslint

# Run jslint on all JavaScript code
jslint:
	jslint js/main.js --terse --browser --indent=2 --plusplus --predef $$

# Run csslint on all CSS code
csslint:
	csslint css/main.css --quiet
