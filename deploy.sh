#!/usr/bin/env sh

# https://cli.vuejs.org/guide/deployment.html#github-pages

# abort on errors
set -e

npm run build

git log --format="VERSION %h %ci" -n 1 > rcj-dss/version.txt
cd rcj-dss

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:nikolockenvitz/rcj-dss.git main:gh-pages

cd -
