#! /usr/bin/env node

// Imports
import chalk from 'chalk';
import inquirer from 'inquirer';

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');

// ------------- End imports -------- //

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Name your project: npx zou-create myProject');
  process.exit(1); //an error occurred
}
if (args.length > 1) {
  console.error('Your project name should have a single word ;)');
  process.exit(1); //an error occurred
}

let project = args[0];



console.log(chalk.magenta.bold('-- Zou!',chalk.yellow('JS --')))
console.log(chalk.red('HTML')+','+chalk.blue('CSS')+','+chalk.yellow('JS')+' & '+chalk.magenta('FUN'))


inquirer
  .prompt([
    /*{
      type: 'input',
      name: 'project',
      message: chalk.whiteBright('\nPick a Name for your project: '),
      filter(val) {
        return val.toLowerCase();
      },
    }, */
    {
      type: 'input',
      name: 'author',
      message: chalk.whiteBright('\nAuthor: '),
    },
    {
      type: 'rawlist',
      name: 'css',
      message: chalk.blue('\nCSS flavor: '),
      choices: ['SCSS', 'Tailwind'],
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'rawlist',
      name: 'js',
      message: chalk.yellow('\nWhat about Scripting: '),
      choices: ['Javascript', 'TypeScript'],
      filter(val) {
        return val.toLowerCase();
      },
    },
  ])
  .then((answers) => {
    //console.log(JSON.stringify(answers, null, '  '));

    //
    //
    // ------ Start of the building ------
    //
    //

    // GET: The project Folder's name
    const folderName = './'+project;

    //
    // ------ Creating FOLDERS ------
    //

    //
    // --- Project's Folder --- 
    //  

    try {

      // FOLDER: "root"

      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);

        console.log('folder ' + project + ' is created!')

      //
      // --- Src Folder --- 
      //  

      // FOLDER: src

      try {
        if (!fs.existsSync(folderName+'/src', { recursive: true })) {
          fs.mkdirSync(folderName+'/src', { recursive: true });
          console.log(folderName+'/src created.')
        }
      } catch (err) {
        console.error(err);
      }

      //
      // --- Layouts ---
      //

      try {

        // FOLDER: src/layouts

        if (!fs.existsSync(folderName+'/src/layouts', { recursive: true })) {
          fs.mkdirSync(folderName+'/src/layouts', { recursive: true });
          console.log('/src/layouts created.')
        }

      } catch (err) {
        console.error(err);
      }


      //
      // --- Macros ---
      //

      try {
        if (!fs.existsSync(folderName+'/src/macros', { recursive: true })) {
          fs.mkdirSync(folderName+'/src/macros', { recursive: true });
          console.log('/src/macros created.')
        }
      } catch (err) {
        console.error(err);
      }

      //
      // --- Pages ---
      //

      try {

        // FOLDER: /src/pages

        if (!fs.existsSync(folderName+'/src/pages', { recursive: true })) {
          fs.mkdirSync(folderName+'/src/pages', { recursive: true });
          console.log('/src/pages created.')
        }

      } catch (err) {
        console.error(err);
      }


       // FILE: /src/pages/index.njk

        const contentIndexPage = `
{% extends "src/layouts/base.njk" %}
{% block pageTitle %} 👋 {% endblock %}
{% block pageDesc %}My Zou! project{% endblock %}

{# Actual visible content on the Page #}
{% block main %}
<main> 
<a href="https://github.com/AndiKod/zou" title="Github">
	<h1>Zou!<span>JS</span></h1>
</a>
<h5 class="fw-light ">— ${project} project by ${answers.author} —</h5>
</main>

<!-- Ridiculous minimal styles -->
<script>
@import url("https://fonts.googleapis.com/css2?family=Boogaloo&family=Caveat&display=swap");

body {
	background: linear-gradient(-45deg, #e45126, #0c73b8, #f5be25, #86c232);
	background-size: 400% 400%;
	animation: gradient 10s ease infinite;
	height: 100vh;

	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

h1 {
	font-family: boogaloo;
	font-size: clamp(4rem, 16vw, 8rem);
	margin-bottom: 2rem;
	text-shadow: 2px 2px 0 rgba(134, 194, 50, 0.6);
}
h1 > span {
	font-size: clamp(1.8rem, 8vw, 4rem);
	padding-left: clamp(0.2rem, 1vw, 1rem);
	text-shadow: 2px 2px 0 rgba(245,190,37, 0.6);
}


h5 {
	font-family: Caveat;
	font-size: clamp(1.6rem, 6vw, 3rem);
}

a,
a:visited,
a:active {
	color: white;
	text-decoration: none;
	transition: all 0.6s;
}

a:hover {
	color: white;
	transform: scale(1.1) rotate(4deg);
}
</script>

{% endblock %}`;
        fs.writeFile(folderName+'/src/pages/index.njk', contentIndexPage, err => {
          if (err) {
            console.error(err);
          }
          //console.log('/src/pages/index.njk created.')
        });




      //
      // --- Partials ---
      //

      try {

        // FOLDER: /src/partials

        if (!fs.existsSync(folderName+'/src/partials', { recursive: true })) {
          fs.mkdirSync(folderName+'/src/partials', { recursive: true });

        }
      } catch (err) {
        console.error(err);
      }


      //
      // --- Scripts ---
      //

      try {

        // FOLDER: src/scripts

        if (!fs.existsSync(folderName+'/src/scripts', { recursive: true })) {
          fs.mkdirSync(folderName+'/src/scripts', { recursive: true });
          console.log('/src/scripts created.')
        }
      } catch (err) {
        console.error(err);
      }

      //
      //  --- JavaScript ---
      //

      if (answers.js === 'javascript') {

        try {

          // FOLDER: src/scripts/js

          if (!fs.existsSync(folderName+'/src/scripts/js', { recursive: true })) {
            fs.mkdirSync(folderName+'/src/scripts/js', { recursive: true });
            console.log('/src/scripts/js created.')
          }
        } catch (err) {
          console.error(err);
        }


        // FILE: src/scripts/main.js

        const content = `import Alpine from 'alpinejs';

import './js/data-store.js';

window.Alpine = Alpine
Alpine.start()`;
        fs.writeFile(folderName+'/src/scripts/main.js', content, err => {
          if (err) {
            console.error(err);
          }
          console.log('/src/scripts/main.js created.')
        });

        // FILE: /src/scripts/js/data-store.js

        const contentDataStore = `
import Alpine from 'alpinejs';

// Alpine Data Store, included into all pages via <body x-data="data">
document.addEventListener('alpine:init', () => {
  Alpine.data('data', ()  => ({

      name: 'Zou!',

      // Fired on x-init
      async init() {

      },
         
  })) // End Alpine.data('data')
}) // End EventListener`;
        fs.writeFile(folderName+'/src/scripts/js/data-store.js', contentDataStore, err => {
          if (err) {
            console.error(err);
          }
          
        });

        
      }


      //
      // --- Static ---
      //

      try {
        if (!fs.existsSync(folderName+'/src/static', { recursive: true })) {
          fs.mkdirSync(folderName+'/src/static', { recursive: true });
          console.log('/src/static created.')
        }
      } catch (err) {
        console.error(err);
      }

      //
      // --- Styles ---
      //

      try {

        // FOLDER: src/styles

        if (!fs.existsSync(folderName+'/src/styles', { recursive: true })) {
          fs.mkdirSync(folderName+'/src/styles', { recursive: true });
 
        }
      } catch (err) {
        console.error(err);
      }


      //
      // --- SCSS ---
      //

      if(answers.css === 'scss') {

        try {

          // FOLDER: src/styles/sass

          if (!fs.existsSync(folderName+'/src/styles/sass', { recursive: true })) {
            fs.mkdirSync(folderName+'/src/styles/sass', { recursive: true });

          }
        
          // FILE: src/styles/sass/sassy.scss
        
        const sassyContent = `
        /** src/styles/sass/sassy.scss **/
        `;

        fs.writeFile(folderName+'/src/styles/sass/sassy.scss', sassyContent, err => {
          if (err) {
            console.error(err);
          }

        });
        
        } catch (err) {
          console.error(err);
        }

      }
      

      //
      // ------ Creating FILES ------
      //


      //
      // --- FILE: src/layouts/base.njk
      //

      // FILE: /src/layouts/base.njk

        const layoutBase = `
<!DOCTYPE html>
<html lang="en">
    <head x-data="data">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content="Zou!" />
    <title>{% block pageTitle %}{% endblock %} {{data.appName}}</title>
    <meta name="description" content="{% block pageDesc %}{% endblock %}">
    <link rel="author" href="/humans.txt" />
    <link rel="icon" href="/favicon.ico" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Boogaloo&family=Caveat&display=swap" rel="stylesheet"> 

    <link rel="stylesheet" src="css/sassy.css" />
    <link rel="stylesheet" src="css/tw.css" />


    {% block headStyles %}{% endblock %}
    {% block headScripts %}{% endblock %}
    </head>
    <body x-data="data" x-init="init()">  

        {% block main %}{% endblock %}
        
    <script src="/script.js"></script>

    </body>
</html>`;

        fs.writeFile(folderName+'/src/layouts/base.njk', layoutBase, err => {
          if (err) {
            console.error(err);
          }
         
        });


      
      //
      // --- Tailwind --- 
      //

      if (answers.css === 'tailwind') {

        // FILE: src/tailwind.config.js

        const content = `
        /** @type {import('tailwindcss').Config} **/
        module.exports = {
            content: ["./src/**/*.{html,njk,js}","./public/**/*.{html,js}"],
            theme: {
            extend: {},
          },
          plugins: [],
      }`;
        fs.writeFile(folderName+'/tailwind.config.js', content, err => {
          if (err) {
            console.error(err);
          }
          //console.log('tailwind.config.js created.')
        });

        // FILE: src/styles/tw-input.css

        const twInputContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;`;
        fs.writeFile(folderName+'/src/styles/tw-input.css', twInputContent, err => {
          if (err) {
            console.error(err);
          }
          //console.log('src/styles/tw-input.css created.')
        });
        
      }


      //
      // --- Nunjucks Config ---
      //

      // FILE: nunjucks.config.js

      const njkConfigContent = `
// nunjucks.config.js

const data = {
  appName: 'zou',
};


module.exports = {
  "options": {
    /**
     * A path to the file containing data for the template.
     * If you want to pass an object, use "render.context" instead.
     */
    //"data": "src/njk/data/data.js",
    /**
     * A hook that's called before calling nunjucks.render()
     * but after nunjucks.configure().
     *
     * Return false to skip rendering (and writing).
     */
    beforeRender (nunjucksEnv, renderName, renderData) { 
      let nunjucks = this;   

      nunjucksEnv.addFilter('shorten', function(str, count) {
          return str.trim().slice(0, count || 5);
      });
      
    },
    /**
     * A hook that's called after calling nunjucks.render()
     * but before writing to a file.
     *
     * Return false to skip writing.
     */
    beforeWrite (destinationFilepath, renderResult) { let nunjucks = this; }
  },

  /**
   * The following keys are members of Nunjucks.
   * To modify any parameter or see possible values,
   * plese check https://mozilla.github.io/nunjucks/api.html
   */

  // Executes nunjucks.configure([path], [options]).
  "configure": {
    "path": undefined,
    "options": {
      "autoescape": true,
      "throwOnUndefined": false,
      // ...
    }
  },

  // Executes nunjucks.render(name, [context], [callback]).
  "render": {
    "name": undefined, // You shouldn't change this.
    /**
     * An object literal containing the data for the template.
     * If you need to load data from a file, use "options.data" instead.
     * If you decide to use "options.data" too, this property will be assigned to it.
     */
    "context": {data},
    "callback": () => {} // Not modificable.
  }

};`;

        fs.writeFile(folderName+'/nunjucks.config.js', njkConfigContent, err => {
          if (err) {
            console.error(err);
          }
         
        });




        //
        //  --- Package JSON ---
        //

        // FILE: package.json

      let tailwindScript = ``; 
      let sassScript = ``;
      let jsScript = ``; 
      let tsScript = ``; 
      
      if (answers.css === 'tailwind') {
        tailwindScript = `"w-tw": "npx tailwindcss -i ./src/styles/tw-input.css -o ./public/css/tw.css --watch",`
      } else {
        tailwindScript = '';
      }
      if (answers.css === 'scss') {
        sassScript = `
        "b-sass": "sass  --no-source-map src/styles/sass:public/css",
        "w-sass": "sass  --no-source-map --watch src/styles/sass:public/css",`
      } else {
        sassScript = '';
      }
      if (answers.js === 'javascript') {
        jsScript = `"w-js": "npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --watch",`
      } else {
        jsScript = '';
      }
      if (answers.js === 'typescript') {
        tsScript = `"w-ts": "npx tsc --src src/scripts/main.ts --outdir public/js/tscript.js --watch",`
      } else {
        tsScript = '';
      }

      let sassPkg = '';
      let twPkg = '';
      let alpinePkg = '';
      let pocketbPkg = '';

      if(answers.css === 'scss') {
        sassPkg = '"sass": "^1.69.4",';
      }
      if(answers.css === 'tailwind') {
        twPkg = '"tailwindcss": "^3.3.3",'
      }

   
      const pkgJsonContent = `{
  "name": "${project}",
  "version": "0.1.0",
  "description": "Say some words about your project",
  "author": "${answers.author}",
  "license": "ISC",
  "main": "index.js",
  "scripts": {
    ${tailwindScript}
    ${sassScript}
    ${jsScript}
    ${tsScript}
    "b-pages": "nunjucks-to-html --baseDir src/pages",
    "c-static": "copyfiles -u 1 \\"./src/static/**/*\\" \\"public\\"",
    "c-root": "copyfiles -u 1 \\"./src/favicon.ico\\" \\"./src/*.txt\\"   \\"public\\"",
    "copy": "npm-run-all --parallel c-*",
    "w-pages": "onchange \\"./src/**/*\\" -- npm run b-pages",
    "watch": "npm-run-all --parallel w-*",
    "serve": "alive-server public",
    "dev": "npm-run-all copy b-pages --parallel watch serve",
    "postbuild": "postcss public/css/sassy.css -u autoprefixer cssnano -r --no-map"
  },
  "dependencies": {
    "alpinejs": "^3.13.2"
  },
  "devDependencies": {
    ${sassPkg}
    ${twPkg}
    "nunjucks-to-html": "^1.1.0",
    "onchange": "^7.1.0",
    "copyfiles": "^2.4.1",
    "npm-run-all": "^4.1.5",
    "alive-server": "^1.3.0",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16",
    "cssnano": "^6.0.1"   
  }
}`;

        fs.writeFile(folderName+'/package.json', pkgJsonContent, err => {
          if (err) {
            console.error(err);
          }

        });
        // end create package.json



        console.log('\n'+chalk.magenta('Ok '+ chalk.bold(answers.author) +', you Rock!'))
        console.log(chalk.bold.whiteBright('Go: ')+ 'cd '+project+' && npm i')
        console.log(chalk.bold.whiteBright('then: ')+ 'npm run start')

        console.log('\n'+chalk.yellowBright.italic('Zou! Happy Coding!')+'\n')

      }
    } catch (err) {
      console.error(err);
    }

  });