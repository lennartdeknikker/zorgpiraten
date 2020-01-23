# zorgpiraten
[![Netlify Status](https://api.netlify.com/api/v1/badges/19ed0eaa-1b85-4b01-a042-9d1e791a9e70/deploy-status)](https://app.netlify.com/sites/zorgpiraten/deploys)

This repository contains our exploratory data visualisation for [Pointer](https://pointer.kro-ncrv.nl/).
It shows all Dutch Healthcare institutions and their profits as a pecentage of their total revenues. It's possible to search for different institutions by name or filter the data on the past few years and on different types of healthcare.

To learn more about the reasons for building this application, please visit [Pointer.kro-ncrv.nl](https://pointer.kro-ncrv.nl/zorgcowboys).

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

### Settings
All data used in this visualisation is obtained from the `public/rawdata.json` file. This file can be changed to show data for different years or make corrections.

To add or change institutions to be highlighted, showing a gif and linking to other webpages going in depth on specific cases, it's possible to change the `public/zorgcowboys.json` file. Just add new institutions to the array like shown below or change the existing data.
```
  {
    "name": "De Kroon Zorginstelling B.V.",
    "link": "https://pointer.kro-ncrv.nl/artikelen/op-deze-manier-vind-je-zorginstellingen-die-megawinsten-maken",
    "gif": "de-kroon-zorginstelling-bv.gif"
  },
```
Don't forget to add the corresponding .gif files to the `public/images` folder.

## Built with
- [Vue](https://vuejs.org/) - the javascript framework used.
- [D3](https://d3js.org/) - Datavisualisation library

## Collaboration
When collaborating on this project, please do so as instructed below.
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

## Authors
- Eva Janssen
- [JesseJRos](https://github.com/JesseJRos)
- [lennartdeknikker](https://github.com/lennartdeknikker)

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements
- Thanks to Pointer for clear briefing and helpful feedback along the way.
- Thanks to  Maaike van Cruchten, [Razpudding](https://github.com/Razpudding) and other teachers for inspiring coaching sessions.
