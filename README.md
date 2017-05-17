# storpug Landing Page

A static landing page built with Pug, Gulp, and Love

## Prerequisites

* This project requires Nodejs v6.x and npm v3.10.x and up
* The `firebase-tools` package is recommended (a local version is installed to node_modules)

## Local Development

First, download this repo.

```bash
git clone git@github.com:storpug/storpug-lp.git
```

Second, install dependencies using `npm`.

```bash
cd storpug-lp
npm install
```

Third, acquire the `prod.conf.json` file for this project. This file contains API keys and other secrets. Put it in the `config` directory. An example file is provided for formatting purposes. See `dev.conf.json`.

Now, build the project and watch for changes. The build files go in the `dist` folder. Any changes to the `src` files trigger a re-build. Open a browser to `http://localhost:8080` to view the site. We use the `http-server` package to create a local http server.

Run:

```bash
npm run serve
```

Note: if you just want to watch the project and not start a server, run:

```bash
npm run watch
```

## Deployment

Before deploying, we must initialize the project with Firebase. Run the command `firebase init`. Look for the storpug project and set it up to use the `dist` folder as the public folder.

When ready, we simply run an `npm` command to deploy. 

Run:

```bash
npm run build
npm run deploy
```

## Enjoy!

Go make magic happen. Solve some problems. 

## Credits

We couldn't have done it without these folks:

* Nodejs
* npm
* Pug
* Gulp
* Firebase
* Freepik
* UglifyJs
* Imagemin
* Google Fonts
* Bootstrap
* http://shegy.pl/
* http://unsplash.com/

## License

MIT