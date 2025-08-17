# Firebase Google Authentication Demo

## Set Up Firebase
1. Download Node.js [here](https://nodejs.org/en/download)
2. Check node version in terminal, run:
    ```
    node -v
    ```
    - You should see something like
    ```
    v22.11.0
    ```
    - If you get an error, do the following:
        - Press the Windows key, type environment variables, and open **Edit system environment variables**
        - Click **Environment Variables**
        - Under **System variables**, find **Path**, click **Edit**
        - Click **New** to add ```C:\Program Files\nodejs\```
        - Click **Ok**, then restart VS Code
3. Create a Firebase Project
    - Go to [Firebase](https://firebase.google.com/)
    - Click **Go to console** on the top right corner
    - Click **Create a Firebase project**
    - Enter your project name
    - Up to you to enable/disable Gemini and Google Analytics
4. Create a web app on Firebase
    - Click on your project
    - Click on **Web </>**
    - Give your app a nickname and check ✅ the set up Firebase Hosting option. Select **Create a new site** and enter your app's domain (the link that people use to go to your website)
    - Click **Register App** then click **next** -> **next** -> **Continue to console** to finish all the steps
5. Run the following commands in your VSCode terminal<br>
    ```
    npm install firebase
    npm install -g firebase-tools
    ```
6. You should see 2 new files created
    - **package.json**
    - **package-loack.json**
7. Create a ```scripts``` folder with these 2 files inside
    - **firebase.js** (copy and paste code from [here](scripts/firebase.js))
    - **user.js** (copy and paste code from [here](scripts/user.js))
8. Create a ```pages``` folder with a ```dashboard.html``` file in it (copy and paste code from [here](pages/dashboard.html))
9. Go to ```index.html``` then add this line as a child of ```<head>```
    ```
    <script src="./scripts/firebase.js" defer type="module"></script>
    ```
    ```
    # here is an example
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="./scripts/firebase.js" defer type="module"></script>
        <title>Firebase Google Auth Demo</title>
    </head>
    ```

## Set Up Firebase Google Authentication
1. Go to your Firebase console
2. Click **Project Overview** -> **Authetication** -> **Get started**
3. Select Google -> toggle **Enable** -> select you support email -> click **Save**
4. Click **Settings** -> **Authorized domains** -> **Add domain** -> Enter **127.0.0.1** -> click **Add** 
5. Go to **Project settings** -> **Your apps** -> **SDK setup and configuration**
    - Copy your **firebaseConfig**
    - e.g.
    ```
    const firebaseConfig = {
        apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxx.firebaseapp.com",
        projectId: "xxxxxxxxxxxx",
        storageBucket: "xxxxxxxx.firebasestorage.app",
        messagingSenderId: "xxxxxxxxxx",
        appId: "xxxxxxxxxxxxxxxxxxx"
    };
    ```
    - Replace the ```firebaseConfig``` in ```firebase.js``` with your own

## Deploy your app
Run the following commands in your terminal:
```
firebase login
```
```
firebase init
```
Select the following:
- Firestore
- Hosting
- Storage
- Realtime Database

You will be prompted with some questions, if not specified below, just press Enter.
- Select ```Use an existing project```, then select your project
- Select any us-west location
- ```What do you want to use as your public directory? .```
- ```Configure as a single-page app (rewrite all urls to /index.html)? n```
- ```File ./index.html already exists. Overwrite? N```
- Enter your user/repository

### Update your ```firebase.json```
Add this to hosting (replace XXX with your own domain):
```
"site": "XXX"
```
It should look something like:
```
"hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "site": "fbgad"
  },
```

## Sources
- [Firebase Google Auth Documentation](https://firebase.google.com/docs/auth/web/google-signin)
- [Youtube - Firebase Google Authentication Tutorial](https://www.youtube.com/watch?v=Uhbn1KmiNbg)
