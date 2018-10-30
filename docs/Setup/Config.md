# Configure your app

## What you need:

1. You need your data manifest `.json` file with pointers to your data ([see step 1](Setup/DataPrep.md))
2. You need to host your data manifest on S3 or GitHub or Gist, and a public URL to the data. The URL should return something that looks like [this](https://s3.amazonaws.com/hotdognothotdog/hotdogManifest.json) (e.g. a raw JSON file, that is a list of strings).
3. You need to be able to upload a new file to S3, GitHub, or Gist, and get the public URL to that file.

## Steps:

1. Scroll to the bottom of any existing Swipes for Science app (e.g https://dev.swipesforscience.org) and click the "Configure"
2. Copy/Paste your firebase API keys from [Step 2](Setup/Firebase.md) and click "Apply"
3. Follow the directions in the video to enable authentication and select the realtime database in "Test Mode"
4. Sign up to create a new account. This is your "admin" account, and is the only one that can update data on your firebase database.
5. Once you're signed in, enter the URL for your data manifest file.
6. On the "Admin" page, click "Preview" to make sure your data looks right, and then "Refresh Sample List". This loads data into your database. Hit Next.
7. Update your widget (following instructions for the widget you choose). Hit Next.
8. Update your homepage: you can give a link to an image for its background. Hit Next.
9. Under "Tutorial", keep "needs tutorial" unchecked for now. Hit Next.
10. Copy/Paste the rules in the "Lock Down your Database" section to the rules section of your Firebase app. This is how we prevent people from messing with your data.
11. Download your config file, then upload it to S3, GitHub, or Gist. Then copy/paste the public URL of the config file to the text input file of step 3. Hit Next.
12. Lastly, you are given a URL to your project. The URL is `https://dev.swipesforscience.org/#/?config=<URL_to_your_config_file>`. Bookmark this page, and share it with your friends!

## Full setup video

<iframe src="https://drive.google.com/file/d/1ys6wxVn4lGaCDDI4ziOmAvxfWdWzj3_o/preview" width="640" height="480"></iframe>
