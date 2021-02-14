# Swipes for Science
[![Build Status](https://travis-ci.org/SwipesForScience/SwipesForScience.svg?branch=master)](https://travis-ci.org/SwipesForScience/SwipesForScience)
## SWIPES FOR SCIENCE ROAR-LDT

First and foremost, Welcome! :tada: Willkommen! :confetti_ball: Bienvenue! :balloon::balloon::balloon:

Thank you for visiting the SwipesForScience app project repository.

This document (the README file) is a hub to give you some information about the project. Jump straight to one of the sections below, or just scroll down to find out more.

* [What are we doing? (And why?)](#what-are-we-doing)
* [Who are we?](#who-are-we)
* [What do we need?](#what-do-we-need)
* [How can you get involved?](#get-involved)
* [Get in touch](#contact-us)
* [Find out more](#find-out-more)
* [Understand the jargon](#glossary)
* [Start developing!](#quickstart)

## What are we doing?

### The problem

* Big data in biomedical research needs individual inspection, but this doesn’t scale for large datasets.
* For example, some researchers analyze MRI images to study the brain. But before they start the analysis, they have to visually inspect each image to make sure it is good quality. And at various stages in data processing, researchers have to check images to make sure the analysis is correct. This can get really unweildy when we have large datasets, which are needed to really understand the brain.
* Citizen science games like [EyeWire](eyewire.org) have been really successful for brain analysis, but it is built for one specific type of data, and its really hard to adapt for a different use-case.
* Researchers need a way to *easily* spin up a citizen science game for their own large datasets, ideally without needing to know web-development (so they can focus on research!)

### The solution

The SwipesForScience game template will:

* Generate a game from a configuration file provided by a researcher
* The game should be easy to deploy online, and require very little knowledge of web technologies/cloud technologies
* Be fun and easy for citizen scientists to use

## Who are we?

The founders of the SwipesForScience game template - [Anisha](https://anisha.pizza) and [Andreea]() - met at the [eLife Innovation Sprint]() in 2018.

The development of this app is supported by [eLife Innovation]()


## What do we need?

**You**! In whatever way you can help.

We need expertise in app development, user experience design, database maintenance, software sustainability, documentation,  technical writing, and project management.

Our primary goal is to make it extremely easy for researchers to set up their own data-annotation game. This means that we need to simplify the dev-ops parts of setup, and we need very clear documentation. We also want to design annotation widgets that are easy and fun to use, so that citizen scientists enjoy playing these games.

## Get involved

If you think you can help in any of the areas listed above (and we bet you can) or in any of the many areas that we haven't yet thought of (and here we're *sure* you can) then please check out our [contributors' guidelines](CONTRIBUTING.md) and our [roadmap](../../issues/16).

Please note that it's very important to us that we maintain a positive and supportive environment for everyone who wants to participate. When you join us we ask that you follow our [code of conduct](CODE_OF_CONDUCT.md) in all interactions both on and offline.


## Contact us

If you want to report a problem or suggest an enhancement we'd love for you to [open an issue](../../issues) at this github repository because then we can get right on it. But you can also contact [Anisha](https://anisha.pizza) by email (anishakeshavan AT gmail DOT com) or on [twitter](https://twitter.com/akeshavan_).


## Find out more

* [Roadmap](../../issues/16)

## Thank you

Thank you so much  for visiting the project and we do hope that you'll join us.

&ast; Also thanks to Kirstie Whitaker for providing this README template

## Glossary

* **README file**: a document that introduces an open project to the public and any potential contributors
* **repository** or **repo**: a collection of documents related to your project, in which you create and save new code or content
* **Roadmap**: a document outlining the schedule of work to be done on a project
* **Milestone**: an event or state marking a specific stage in development on the project
* **Issue**: the GitHub term for tasks, enhancements, and bugs for your projects


## Quickstart

First you should `git clone https://github.com/SwipesForScience/SwipesForScience`. This app was built with the `vue-cli` webpack template, so we've included their instructions on how to build below:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
./node_modules/.bin/firebase-server -p 5000 -f test/testDB.json &
npm run unit

# run e2e tests (we don't have these yet)
npm run e2e

# run all tests (we don't have these yet)
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Structure

The app structure looks like:

![diagram](https://raw.githubusercontent.com/SwipesForScience/SwipesForScience/master/src/assets/swipesforscience_architecture.svg?sanitize=true)
