# zipper-images
> A Base64 string replace with compressed string to keep HTML light

### Table of Contents
-   [Usage](#usage)
-   [Environment](#environment)
    -   [Development](#development)
    -   [Pre Production](#pre-production)
- [Task Runner Configuration](#task-runner-configuration)

## Usage

First, clone repo `zipper-images` into your local store:

```shell
git clone https://github.com/FabioAnsaldi/zipped-images.git
```
######

## Environment
Now you can run Pre Production environment and see the final result result or if you want you can edit the project by running it through the developing environment

######

## Development



```shell
npm run gulp
```
> It runs developing environment. You can edit resources and watch result at specific local URL: http://localhost:3000/

######

## Pre Production

```shell
npm run prod
```
> It runs pre production environment. You can watch result at specific local URL: http://localhost:3000/

######

## Task Runner Configuration

If you need to change local server port, edit Gulpfile situated on the root of the project.

```js
. . .
gulp.task( 'server', () => {
    let pathRoot = process.argv[ 3 ].indexOf( 'production' ) >= 0 ? paths.production.html : paths.develop.html;
    connect.server( {
        root: pathRoot,
        port: 3000,
        livereload: true
    } );
} );
. . .
```

######