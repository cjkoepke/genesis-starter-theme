# Genesis Starter Theme

A starter framework for Genesis child themes which includes starter SCSS files and a Gulp task file which automates:

1. JS compression
2. SCSS compiling and compression
3. File watching
4. Generation of a POT file for translation
5. Automatic zipping of the theme without including the development files.

- <a href="#installation">Installation/Initiation Instructions</a>
- <a href="#optional-commands">Optional Gulp Commands</a>

<hr/>

## About Starter
Starter is a project by Calvin Koepke, a frontend designer currently working at Rainmaker Digital.
The goal of the project is to create a starter theme for Genesis Framework developers that doesn't over-bloat their starting base, while including commonly used templates, codes, and styles, and which includes common Gulp development tasks.

Useful Links:

- [Submit a Pull Request](https://github.com/cjkoepke/genesis-starter-theme/pulls) if you'd like to help out and keep it awesome. ;-)
- [Changelog](#changelog)

## License
This starter theme is free to use as you wish. GPL licensing allows for you to hack it however you wish, no credit needed. If you like what I build, you can find me on Twitter: <a href="https://twitter.com/cjkoepke">@cjkoepke</a>.

### Reasons to Use Starter
- It comes accessible out of the gate.
- It's mobile-first.
- It comes pre-packaged with default settings and templates that are common in Genesis child theme development.
- It removes the unnecessary (and discouraged) blog template from the parent Genesis theme.
- It has almost **zero** styling, reducing visual influence on your projects.
- It comes with a ready-to-use, ultra-easy responsive menu script (updating soon to be even better).

<hr/>

## What the Gulp Automation Does
- The Gulp task file will watch dev files under `/assets/` in the SCSS/JS directories and rebuild files on the fly.
- **Note:** To separate dev from production files, the task manager will output minified files to a `/build/` folder at the theme root.
- File naming will stay the same with `.min.ext` appended to the file name.

<hr/>

## Installation
**NOTE:** Use of the Gulp task file requires you to have <a href="https://docs.npmjs.com/getting-started/installing-node">Node and NPM</a> and <a href="http://sass-lang.com/install">SASS</a> installed on your computer.

1. Clone the repo to your desktop, somewhere **other** than in your theme root (you don't want updates to override your theme edits!)
2. Copy the files in the cloned `./starter-theme/` directory to your theme root.
4. In terminal, navigate to the theme root directory:

```
$ cd ~/path/to/parent-theme-folder/
```

5. Run the following NPM command to install task dependencies. This will also automatically initiate first compiling, JS compression and `/build/` folder creation, and file watching.

```
$ npm install --save-dev --legacy-bundling
```

6. You're good to go!

## Optional Commands
There are three specific Gulp commands for you to use in the Terminal:

### Watch files
To start the file watcher for changes made to files in `/assets/scss` and `/assets/js`, all you need to do is run the command:

```
$ gulp watch
```

### Build POT File for Translation
To build a POT file for your theme (so translators can include different languages), you need to generate a POT file. This is usually pretty tedious, but Gulp makes it easy and as simple as running this command:

```
$ gulp translate-theme
```

That's it! Gulp will translate all the PHP files in your theme, and output a POT file in a newly created `/translation/` directory in your theme root. **NOTE:** You'll have to include the translation file in your theme's `functions.php` file for use.

### Package Theme for Production
You can package your theme for production in a ZIP file by running the following command. Depending on the size of your theme, it may take a while — be patient! The command will automatically ignore dev-kit files (gulpfile.js, package.json, and node_modules). It will keep the SCSS folder in `/assets/` since end-users will find this useful.

**NOTE**: It might be a good idea to update the compression method for SCSS to `compressed` just prior to packaging, and manually add the commented header at the top after output (this creates smaller file, but will remove the `style.css` header and thus break the theme).

```
$ gulp package-theme
```

<hr/>

## Changelog
= 1.1.0 =
* Added better responsive menu + menu styles
* Added sourcemapping
* Added error logging to SCSS compiler

= 1.0.0 =
* Initial Release
