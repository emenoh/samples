https://git.fossil.com/projects/PROT/repos/aurochproto/browse?at=develop

This is in the README.txt file

ExpressJS Matador prototyping app. https://github.com/Obvious/matador

To run this you must have node installed w/ npm support. 

First Clone the repo.

Run this command from CLI (Terminal) anywhere.

npm install matador -g 

then from the root directory of  the Aurochs repo run

node server.js


######### Setting up a Fossil site###########

Fossil sites need a symlink here (assuming you are checkout out all projects from GIT into a common workspace):

aurochproto/app/public/wcsstore/Fossil --> ../fossil/website/web/

and here:

aurochproto/app/public/wcsstore/CommonFossil --> ../commonfossil/publish/live/web/CommonFossil

The above path also assumes that you are building the javascript using

ant -buildfile build/build.xml buildDev

from within the CommonFossil working directory. This build script will optimize and copy all files from commonfossil/website/web/ to /commonfossil/publish/live/web/CommonFossil/


