# Website fonts

Both Greek and English use EB Garamond for serif headings and Commissioner for body text and controls. Fonts are bundled locally so builds do not depend on Google Fonts downloads.

Original variable fonts come from the Google Fonts repository:

- https://github.com/google/fonts/tree/main/ofl/ebgaramond
- https://github.com/google/fonts/tree/main/ofl/commissioner

The accompanying OFL files retain each font's license and copyright notice.

The WOFF2 assets were generated with FontTools by subsetting the original TTF files, then restricting variable axes and compressing them. They retain Latin, Latin Extended, Greek, Greek Extended, combining marks, punctuation, currency symbols, and arrows. All characters in both site dictionaries are covered.

Retained Unicode ranges: `U+0000-024F,U+0300-03FF,U+1E00-1FFF,U+2000-206F,U+20A0-20CF,U+2100-21FF,U+FEFF,U+FFFD`.

- EB Garamond regular and italic: `wght=400:500`.
- Commissioner: `wght=400:600`, with `FLAR=0`, `VOLM=0`, and `slnt=0`.

No font conversion dependency is required to build or run the website.
