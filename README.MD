Create React App
```
npx create-react-app footy-tips-3
```
Install packages
```
npm install --save react react-dom redux react-redux redux-thunk react-router-dom moment

npm install --save firebase@4.12.1

npm install --save-dev redux-devtools-extension firebase-admin
```
To test
```
npm run start
```

Firebase Hosting Config

For Firebase hosting, first initialize Firebase
```
firebase init
```
Select hosting
Directory is 'build'
To deploy
```
npm run build
firebase deploy
```
Config options
```
What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File public/index.html already exists. Overwrite? No
i  Skipping write of public/index.html

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```
