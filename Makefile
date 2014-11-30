# Run linters on the source code
lint: jslint csslint

# Run jslint on all JavaScript code
jslint:
	jslint assets/script.js --terse --browser --indent=2 --predef $$

# Run csslint on all CSS code
csslint:
	csslint assets/style.css --quiet
