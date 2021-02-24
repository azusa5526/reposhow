set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/azusa5526/reposhow.git master:gh-pages

cd -