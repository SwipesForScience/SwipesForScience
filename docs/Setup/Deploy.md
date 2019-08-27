# Deploying to GitHub with Travis-CI

In the previous step, you were able to play your app from the https://dev.swipesforscience.org website by adding a URL to your config file https://dev.swipesforscience.org?config=<url_to_your_config_file>. Now, you might want to change something about your website or host it on your own domain.

## What you need

* a GitHub account
* a Travis-CI account (you can log in with you GitHub credentials)
* a domain name. email anisha keshavan AT gmail DOT com and we can give you a swipesforscience.org subdomain.

1. To deploy your own site via GitHub Pages, you need to first **[fork the SwipesForScience repo on GitHub](https://github.com/SwipesForScience/SwipesForScience)** and then clone it to your local computer:

`git clone https://github.com/<your_github_username>/SwipesForScience`

2. Create a [GitHub personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) with repo scope. This will be used to push to the gh-pages branch from travis. Save this token on your computer somewhere.

3. Turn on Travis-CI for your fork. Go to https://travis-ci.org/account/repositories and turn it on for you SwipesForScience repository.

![](https://raw.githubusercontent.com/SwipesForScience/SwipesForScience/master/docs/Setup/Screen%20Shot%202019-08-27%20at%2012.39.54%20PM.png)

4. Click the "Settings" button as shown in the image above. Set the GH_TOKEN variable on travis-ci for your SwipesForScience repo by copying and pasting your token from earlier. Also add GH_USER to be your username and GH_REPO to be "SwipesForScience"

![](https://raw.githubusercontent.com/SwipesForScience/SwipesForScience/master/docs/Setup/Screen%20Shot%202019-08-27%20at%2012.40.17%20PM.png)

5. In your cloned SwipesForScience folder, change the `.travis.yml` file to look like: 

```
sudo: false
language: node_js
node_js:
- '6.0'
cache:
  directories:
  - node_modules/
branches:
  only:
  - master
notifications:
  email: false
before_script:
  - npm install
script:
  - npm run build
after_script:
  - bash ./deploy.sh
```

6. In your cloned SwipesForScience folder, create a `deploy.sh` file at the root level (`SwipesForScience/deploy.sh`) and copy/paste the following into it:

```
#!/bin/bash

set -e # exit with nonzero exit code if anything fails

if [[ $TRAVIS_BRANCH == "master" && $TRAVIS_PULL_REQUEST == "false" ]]; then

echo "Starting to update gh-pages\n"
#copy data we're interested in to other place
cp -R dist $HOME/dist

#go to home and setup git
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"

#using token clone gh-pages branch
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/${GH_USER}/${GH_REPO}.git gh-pages > /dev/null

#go into directory and copy data we're interested in to that directory
cd gh-pages
cp -Rf $HOME/dist/* .

echo "Allow files with underscore https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/" > .nojekyll
echo "[View live](https://${GH_USER}.github.io/${GH_REPO}/)" > README.md

#add, commit and push files
git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
git push -fq origin gh-pages > /dev/null

echo "Done updating gh-pages\n"

else
 echo "Skipped updating gh-pages, because build is not triggered from the master branch."
fi;
```

7. Copy your config.json file to `SwipesForScience/src/config.json`. Edit `SwipesForScience/src/config.js` to be only:

```javascript

import config './config.json`;

export default config;

```

8. Edit your domain name in the Settings folder of your GitHub fork of SwipesForScience, under the "Custom domain" setting. 

9. Push your changes to your GitHub fork

```
git add .travis.yml src/config.json src/config.js deploy.sh`
git commit -m "added deploy files"
git push origin master
```

After you are done, you should check the status of your repo on https://travis-ci.org . If it successfully completes, you can see your site by going to your domain.
