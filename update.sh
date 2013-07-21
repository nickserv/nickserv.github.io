#!/bin/bash
# Updates Bower packages

echo "Updating gem dependencies..."
bundle update

echo "Updating Bower packages..."
bower update
