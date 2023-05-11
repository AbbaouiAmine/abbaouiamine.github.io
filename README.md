# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# How to update React in GitHub pages:

Assuming you already have a GitHub page running with gh-pages and after you push your changes, you see them in your repo but the GitHub page is not being updated.

Keep reading the full guide or check out the quick solution in the [Tutorial Page](https://frnt-end.github.io/Update-React-in-GitHub-Pages/)
(If you wondering about the full-screen video in the tutorial page, check this guide to learn how to set a [Responsive video in React](https://frnt-end.github.io/React-Responsive-Video/))

---

In this sample we are using **npm** and our branch called **master**, if needed, change them according to your own settings.
We already have a **build directory** - and if you don't have one? no problem!
just execute `npm run build` command (make sure the build folder it's not listed in the .gitignore file).

---

## Let's Start

#### The solution is simple - we just need to update the build directory!

## In the terminal:

Make sure you are in the project folder and no other processes are running (to stop all processing in the terminal: **Ctrl + c** in Windows OR **Cmd + c** in Mac)

### Deploy the build folder:

##### `npm run deploy`

(If you are using GitHub in your code editor, you will see the build folder content being added to the **Unstaged Changes** - ready to be staged).

### Stage all:

##### `git add .`

### ..and commit:

##### `git commit -m "update build for gh-pages"`

### Last step - Push to GitHub:

##### `git push -u origin master`

---

# Done! 👍

##### Refresh your page in GitHub and see the new changes.

---

### Learn More about React & GitHub Pages

- [Article - How to Deploy a Routed React App to GitHub Pages](https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/)

- [YouTube tutorial - How to Deploy React App to GitHub Pages](https://www.youtube.com/watch?v=F8s4Ng-re0E)

### License

Copyright © 2015 @frnt-end
[frnt-end.github.io/portfolio/](https://frnt-end.github.io/portfolio/)

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
