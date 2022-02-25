printf "node version (needs v14+): "
node --version


FILE=cs-csv
echo "--- $FILE"
mkdir -p ./dist/$FILE
rm ./dist/$FILE/*.*
npx esbuild $FILE.js --bundle --minify --format=esm --target=es2020 --outfile=./dist/$FILE/$FILE.min.js 
cd ./dist/$FILE
npx gzip -- -k $FILE.min.js
npx brotli-cli compress $FILE.min.js
ls
cd ../..
 

FILE=createStore
echo "--- $FILE"
mkdir -p ./dist/$FILE
rm ./dist/$FILE/*.*
npx esbuild $FILE.js --bundle --minify --format=esm --target=es2020 --outfile=./dist/$FILE/$FILE.min.js 
cd ./dist/$FILE
npx gzip -- -k $FILE.min.js
npx brotli-cli compress $FILE.min.js
ls
cd ../..


