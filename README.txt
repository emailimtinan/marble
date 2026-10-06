MARBLE.MOV — SEPARATED WEBSITE

Folder structure
----------------
index.html
css/
  styles.css
js/
  head.js
  body-pre.js
  body-post.js
DEPENDENCIES.json

How it is connected
-------------------
index.html loads:
- css/styles.css
- js/head.js
- js/body-pre.js
- js/body-post.js

The Framer runtime modules, images, fonts, video, and analytics remain referenced from their original external Framer URLs. This preserves the exported site's behavior rather than replacing those dependencies.

Important
---------
Do not rename or move the files unless you also update the paths in index.html.
Open index.html from a web server/hosting environment for the most reliable Framer-module behavior.
