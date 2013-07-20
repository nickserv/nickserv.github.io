#!/bin/bash
# Updates Bower packages

echo "Updating gem dependencies..."
bundle update

pushd public > /dev/null
echo "Updating Bower packages..."
bower update
popd > /dev/null
