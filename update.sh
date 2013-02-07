#!/bin/bash
# Updates Bower packages and reinstalls latest versions of Bootswatch themes

function bootswatch {
	pushd components/bootstrap.css/css > /dev/null
	for theme in $*; do
		echo "Downloading $theme theme"
		curl http://bootswatch.com/$theme/bootstrap.css -so bootstrap-$theme.css
		curl http://bootswatch.com/$theme/bootstrap.min.css -so bootstrap-$theme.min.css
	done
	popd > /dev/null
}

echo "Updating gem dependencies..."
bundle update

pushd public > /dev/null
echo "Updating Bower packages..."
bower update

echo "Updating Bootswatch themes..."
bootswatch cyborg slate cosmo
popd > /dev/null
