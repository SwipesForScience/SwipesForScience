# Setting up Firebase

## What is Firebase?

* Firebase is a backend as a service

## What you need to get started

* A google account

## Create a Firebase Project

* Go to [https://console.firebase.google.com](https://console.firebase.google.com)

* Click on "Add Project"

![create project button](../Images/CreateProjectButton.png ':size=300')

* Give your project a name and ID. Hit continue

![create project button](../Images/ProjectNameSetup.png ':size=300')

* Hit continue when the project has finished setting up

![done with setup](../Images/SetupDone.png ':size=300')

* Your landing screen should look like:

![firebase landing page](../Images/FirebaseLandingPage.png ':size=400')

* Click on the ![firebasebutton](../Images/firebaseButton.png ':size=30') button on the landing page. These are your firebase API keys. They are allowed to be public, so don't worry about sharing this on GitHub. Make note of these keys, as we will use them later. For example, here are mine:

![firebase API keys](../Images/firebaseAPIKeys.png ':size=400')

* On the sidebar of the Firebase console, click "Authentication". Then click on the "Sign-In method" tab. You should see:

![sign in method](../Images/SignInMethod.png ':size=400')

* Click on "Set up sign in method", and then click the pencil button on Email/Password. A pop up should show up:

![enable email](../Images/EnableEmail.png ':size=400')

* Enable email. The authentication panel now looks like:

![email is enabled](../Images/EmailEnabled.png ':size=400')


* Next, go to the Database section from the sidebar, and scroll down to "Or choose Realtime Database":

![choose realtime database](../Images/CreateRealtimeDatabase.png)

* Click Enable. You can start your database in Test mode, we will change these rules in the next step.

![test mode rules](../Images/TestModeRules.png ':size=400')

* Now navigate to https://dev.swipesforscience.org and scroll to the bottom and click "Configure"
