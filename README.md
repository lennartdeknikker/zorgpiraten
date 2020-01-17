# zorgpiraten
[![Netlify Status](https://api.netlify.com/api/v1/badges/19ed0eaa-1b85-4b01-a042-9d1e791a9e70/deploy-status)](https://app.netlify.com/sites/zorgpiraten/deploys)

This repository contains our data visualisation application for [Pointer](https://pointer.kro-ncrv.nl/).

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites
To start working on this project, first clone this repository with `git clone https://github.com/lennartdeknikker/zorgpiraten.git`.
Then install the necessary node modules with `npm install`.

This application uses the vue-cli to run the development environment. It's recommended to install this globally with:
```
npm install -g @vue/cli
```

### Usage
Use the following commands to get the application running, build a minified production version in the dist folder or lint and fix files.

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```


## Collaboration
### Create a new issue
To make changes, please first create a new issue. Add this issue to the project 'zorgcowboys' and move it to the right place on the [kanban board](https://github.com/lennartdeknikker/zorgpiraten/projects/1) under projects.


### Create a new branch for this new issue
Then create a new branch locally for the specific issue you're working on:
```
git checkout -b issue-name
```
Create the new branch on the remote with
```
git push origin issue-name
```
Then push the branch and set the remote as upstream with
```
git push --set-upstream origin isse-name
```

### Push your changes
1. Stage changes with `git add .`.
2. Then add these staged changes to a new commit. When adding commits, please use the gitmoji's found [here](https://gitmoji.carloscuesta.me/) like this: `git commit -m ":tada: create the boilerplate"` and formulate the commit message as: this commit will \<commit message\>.
3. Push your commits to the branch with `git push`.

### Create a new pull request
When you have solved the issue, you've been working on, you can do a pull request to merge your branch with the master branch. To do that:
1. Go to the online repository.
2. Select the branch you've worked on.
3. Click "create pull request"
4. Add me: lennartdeknikker to "assignees"
5. Write down a summary of your changes
6. Create the pull request

After reviewing your request, your changes will be merged with the master branch and the branch for that issue will be deleted.
