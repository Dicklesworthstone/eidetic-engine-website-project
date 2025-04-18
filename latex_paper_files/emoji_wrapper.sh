#!/bin/bash
# emoji-replacer.sh - Automatically replace emojis in LaTeX minted environments

set -e  # Exit on error

if [ -z "$1" ]; then
  echo "Usage: ./emoji-replacer.sh <file.tex>"
  exit 1
fi

FILE="$1"
BACKUP="${FILE}.emoji-backup.$(date +%Y%m%d%H%M%S)"

# Create backup
cp "$FILE" "$BACKUP"
echo "Created backup at $BACKUP"

# Create a temporary file for processing
TEMP=$(mktemp)

# Process the file line by line to handle minted environments
awk '
BEGIN {
  in_minted = 0;
  in_pageable = 0;
}

# Track when we enter/exit minted or pageablecode environments
/\\begin{minted}/ { in_minted = 1; }
/\\end{minted}/ { in_minted = 0; }
/\\begin{pageablecode}/ { in_pageable = 1; }
/\\end{pageablecode}/ { in_pageable = 0; }

{
  line = $0;
  # Only process lines within minted or pageablecode
  if (in_minted || in_pageable) {
    # Replace common emojis with their escaped versions
    gsub(/✅/, "|\\\\checkmark|", line);
    gsub(/❌/, "|\\\\xmark|", line);
    gsub(/⏭/, "|\\\\skipmark|", line);
    gsub(/⏳/, "|\\\\waiting|", line);
    gsub(/❓/, "|\\\\question|", line);
    gsub(/🔄/, "|\\\\refresh|", line);
    gsub(/🔍/, "|\\\\search|", line);
    gsub(/📝/, "|\\\\note|", line);
    gsub(/💾/, "|\\\\save|", line);
    gsub(/⚠️/, "|\\\\warning|", line);
    gsub(/⏱️/, "|\\\\timer|", line);
    gsub(/⚙️/, "|\\\\gear|", line);
  }
  print line;
}
' "$FILE" > "$TEMP"

# Check file size isn't drastically different
ORIG_SIZE=$(wc -c < "$FILE")
NEW_SIZE=$(wc -c < "$TEMP")
RATIO=$(echo "scale=2; $NEW_SIZE / $ORIG_SIZE" | bc)

if (( $(echo "$RATIO < 0.5" | bc -l) )) || (( $(echo "$RATIO > 2.0" | bc -l) )); then
  echo "WARNING: File size changed dramatically. Aborting for safety."
  echo "Original: $ORIG_SIZE bytes, New: $NEW_SIZE bytes"
  echo "Check the temporary file at $TEMP manually if desired."
  exit 1
fi

# Copy the processed file back
cp "$TEMP" "$FILE"
rm "$TEMP"

echo "Processing complete! Don't forget to add these commands to your preamble:"
cat << 'EOF'

% Add these commands to your preamble
\newfontfamily\emojifont{Noto Color Emoji}
\newcommand{\emoji}[1]{\emojifont #1}
\newcommand{\checkmark}{\emoji{✅}}
\newcommand{\xmark}{\emoji{❌}}
\newcommand{\skipmark}{\emoji{⏭}}
\newcommand{\waiting}{\emoji{⏳}}
\newcommand{\question}{\emoji{❓}}
\newcommand{\refresh}{\emoji{🔄}}
\newcommand{\search}{\emoji{🔍}}
\newcommand{\note}{\emoji{📝}}
\newcommand{\save}{\emoji{💾}}
\newcommand{\warning}{\emoji{⚠️}}
\newcommand{\timer}{\emoji{⏱️}}
\newcommand{\gear}{\emoji{⚙️}}
EOF

echo "Make sure all your minted environments include the 'escapeinside=||' option."