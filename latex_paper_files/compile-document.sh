#!/bin/bash
set -e  # Exit on error

# Default to main.tex if no argument provided
if [ -z "$1" ]; then
  TEXFILE="main.tex"
else
  TEXFILE="$1"
fi

FILENAME="${TEXFILE%.tex}"

# Run with increased memory
export TEXMFCNF="$(pwd):"

echo "Compiling $FILENAME.tex..."

# First run
xelatex -shell-escape -interaction=nonstopmode "$FILENAME.tex"

# Run biber if references.bib exists
if [ -f references.bib ]; then
  echo "Running biber for bibliography..."
  biber "$FILENAME"
fi

# Additional runs for cross-references
echo "Second XeLaTeX pass..."
xelatex -shell-escape -interaction=nonstopmode "$FILENAME.tex"
echo "Final XeLaTeX pass..."
xelatex -shell-escape -interaction=nonstopmode "$FILENAME.tex"

echo "==================================="
echo "Compilation complete! Check $FILENAME.pdf"
echo "==================================="