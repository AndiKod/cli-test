#! /usr/bin/env node

// Imports
import chalk from "chalk";
import inquirer from "inquirer";

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");

// ------------- End imports -------- //

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Name your project: npx zou-create myProject");
  process.exit(1); //an error occurred
}
if (args.length > 1) {
  console.error("Your project name should have a single word, or hyphens ;)");
  process.exit(1); //an error occurred
}

let project = args[0];

console.log(chalk.magenta.bold("-- Zou!", chalk.yellow("JS --")));
console.log(
  chalk.red("HTML") +
    "," +
    chalk.blue("CSS") +
    "," +
    chalk.yellow("JS") +
    " & " +
    chalk.magenta("FUN")
);

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
      type: "input",
      name: "author",
      message: chalk.whiteBright("\nAuthor: "),
    },
    {
      type: "rawlist",
      name: "css",
      message: chalk.blue("CSS flavor: "),
      choices: ["SCSS", "Tailwind"],
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: "rawlist",
      name: "js",
      message: chalk.yellow("What Scripting: "),
      choices: ["Javascript", "TypeScript"],
      filter(val) {
        return val.toLowerCase();
      },
    },
  ])
  .then((answers) => {
    //console.log(JSON.stringify(answers, null, '  '));

    //
    //
    // ---------------------------- Building ---------------------------- //
    //
    //

    // GET: The project Folder's name
    const folderName = "./" + project;

    //
    // ---------------------- Creating FOLDERS ---------------------- //
    //

    //
    // --- Project's Folder ---
    //

    try {
      // FOLDER: "root"

      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);

        //
        // --- Src Folder ---
        //

        // FOLDER: src

        try {
          if (!fs.existsSync(folderName + "/src", { recursive: true })) {
            fs.mkdirSync(folderName + "/src", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        // --- Layouts ---
        //

        try {
          // FOLDER: src/layouts

          if (
            !fs.existsSync(folderName + "/src/layouts", { recursive: true })
          ) {
            fs.mkdirSync(folderName + "/src/layouts", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        // --- Macros ---
        //

        try {
          if (!fs.existsSync(folderName + "/src/macros", { recursive: true })) {
            fs.mkdirSync(folderName + "/src/macros", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        // --- Pages ---
        //

        try {
          // FOLDER: /src/pages

          if (!fs.existsSync(folderName + "/src/pages", { recursive: true })) {
            fs.mkdirSync(folderName + "/src/pages", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        // --- Partials ---
        //

        try {
          // FOLDER: /src/partials

          if (
            !fs.existsSync(folderName + "/src/partials", { recursive: true })
          ) {
            fs.mkdirSync(folderName + "/src/partials", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        // --- Scripts ---
        //

        try {
          // FOLDER: src/scripts

          if (
            !fs.existsSync(folderName + "/src/scripts", { recursive: true })
          ) {
            fs.mkdirSync(folderName + "/src/scripts", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        //  --- JavaScript ---
        //

        if (answers.js === "javascript") {
          try {
            // FOLDER: src/scripts/js

            if (
              !fs.existsSync(folderName + "/src/scripts/js", {
                recursive: true,
              })
            ) {
              fs.mkdirSync(folderName + "/src/scripts/js", { recursive: true });
            }
          } catch (err) {
            console.error(err);
          }
        }

        //
        //  --- TypeScript ---
        //

        /*
      if (answers.js === 'typescript') {

        try {

          // FOLDER: src/scripts/ts

          if (!fs.existsSync(folderName+'/src/scripts/ts', { recursive: true })) {
            fs.mkdirSync(folderName+'/src/scripts/ts', { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

      }
      */

        //
        // --- Static ---
        //

        try {
          if (!fs.existsSync(folderName + "/src/static", { recursive: true })) {
            fs.mkdirSync(folderName + "/src/static", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        // --- Styles ---
        //

        try {
          // FOLDER: src/styles

          if (!fs.existsSync(folderName + "/src/styles", { recursive: true })) {
            fs.mkdirSync(folderName + "/src/styles", { recursive: true });
          }
        } catch (err) {
          console.error(err);
        }

        //
        // --- SCSS ---
        //

        if (answers.css === "scss" || answers.css === "bootstrapcdn") {
          try {
            // FOLDER: src/styles/sass

            if (
              !fs.existsSync(folderName + "/src/styles/sass", {
                recursive: true,
              })
            ) {
              fs.mkdirSync(folderName + "/src/styles/sass", {
                recursive: true,
              });
            }

            // FILE: src/styles/sass/sassy.scss

            const sassyContent = `
        /** src/styles/sass/sassy.scss **/
        `;

            fs.writeFile(
              folderName + "/src/styles/sass/sassy.scss",
              sassyContent,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          } catch (err) {
            console.error(err);
          }
        }

        //
        // ----------------------  Creating FILES  ---------------------------- //
        //

        //
        // --- FILE: src/layouts/base.njk
        //

        // FILE: /src/layouts/base.njk

        let cssfile = "";
        let jsfile = "";
        let alpineStore = "";
        let alpineCDN = "";

        if (answers.css === "scss") {
          cssfile = '<link rel="stylesheet" href="/main.css" />';
        } else {
          cssfile = '<link rel="stylesheet" href="/tw.css" />';
        }

        if (answers.js === "javascript") {
          jsfile = '<script src="/script.js"></script>';
        } else {
          jsfile = '<script src="/main.js"></script>';
        }

        if (answers.js === "typescript") {
          alpineStore = `
      <script>
        // Alpine Data Store, included into all pages via <body x-data="data">
        document.addEventListener('alpine:init', () => {
          Alpine.data('data', ()  => ({

              name: '${project}',

              // Fired on x-init
              async init() {

              },

          })) // End Alpine.data('data')
        }) // End EventListener
      </script>`;

          alpineCDN = `
        <!-- To use it as Module, Types need to be installed  -->
        <script src="//unpkg.com/alpinejs" defer></script>`;
        }

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

    <!-- Fonts for the Welcome page -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Boogaloo&family=Caveat&display=swap" rel="stylesheet">
    <!-- {% import '../../node_modules/zoumacros/lib/cdn.njk' as cdn %} -->
    <!-- {{ cdn.pkg('bulma') }} -->
    <!-- https://github.com/AndiKod/zouMacros -->
    ${alpineCDN}
    ${cssfile}
    {% block headStyles %}{% endblock %}
    {% block headScripts %}{% endblock %}
    </head>
    <body x-data="data" x-init="init()">

        {% block main %}{% endblock %}

    ${jsfile}

    ${alpineStore}

    </body>
</html>`;

        fs.writeFile(
          folderName + "/src/layouts/base.njk",
          layoutBase,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );

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
<h5 class="withMixin">${project} project by ${answers.author}</h5>
</main>

<!-- Minimal styles -->
<style>

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
</style>

{% endblock %}`;
        fs.writeFile(
          folderName + "/src/pages/index.njk",
          contentIndexPage,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );

        //
        // --- if Javascript ---
        //

        if (answers.js === "javascript") {
          // FILE: src/scripts/main.js

          const content = `import Alpine from 'alpinejs';

import './js/data-store.js';

window.Alpine = Alpine
Alpine.start()`;
          fs.writeFile(folderName + "/src/scripts/main.js", content, (err) => {
            if (err) {
              console.error(err);
            }
            console.log("/src/scripts/main.js created.");
          });

          // FILE: /src/scripts/js/data-store.js

          const contentDataStore = `
import Alpine from 'alpinejs';

// Alpine Data Store, included into all pages via <body x-data="data">
document.addEventListener('alpine:init', () => {
  Alpine.data('data', ()  => ({

      name: '${project}',

      // Fired on x-init
      async init() {

      },

  })) // End Alpine.data('data')
}) // End EventListener`;
          fs.writeFile(
            folderName + "/src/scripts/js/data-store.js",
            contentDataStore,
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );
        }

        //
        // --- if TypeScript ---
        //

        if (answers.js === "typescript") {
          // FILE: tsconfig.json

          const tsconfigContent = `{
          "compilerOptions": {
            /* Visit https://aka.ms/tsconfig.json to read more about this file */

            /* Projects */
            // "incremental": true,                              /* Enable incremental compilation */
            // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
            // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
            // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
            // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
            // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

            /* Language and Environment */
            "target": "ES6",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
            // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
            // "jsx": "preserve",                                /* Specify what JSX code is generated. */
            // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
            // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
            // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
            // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
            // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using \`jsx: react-jsx*\`.\` */
            // "reactNamespace": "",                             /* Specify the object invoked for \`createElement\`. This only applies when targeting \`react\` JSX emit. */
            // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
            // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */

            /* Modules */
            "module": "commonjs",                                /* Specify what module code is generated. */
            // "rootDir": "./",                                  /* Specify the root folder within your source files. */
            // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
            // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
            // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
            // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
            // "typeRoots": [],                                  /* Specify multiple folders that act like \`./node_modules/@types\`. */
            // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
            // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
            // "resolveJsonModule": true,                        /* Enable importing .json files */
            // "noResolve": true,                                /* Disallow \`import\`s, \`require\`s or \`<reference>\`s from expanding the number of files TypeScript should add to a project. */

            /* JavaScript Support */
            // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the \`checkJS\` option to get errors from these files. */
            // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
            // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from \`node_modules\`. Only applicable with \`allowJs\`. */

            /* Emit */
            // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
            // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
            // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
            // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
            // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If \`declaration\` is true, also designates a file that bundles all .d.ts output. */
            "outDir": "./public",                               /* Specify an output folder for all emitted files. */
            // "removeComments": true,                           /* Disable emitting comments. */
            // "noEmit": true,                                   /* Disable emitting files from a compilation. */
            // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
            // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
            // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
            // "sourceRoot": "./src/scripts",                                 /* Specify the root path for debuggers to find the reference source code. */
            // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
            // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
            // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
            // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
            // "newLine": "crlf",                                /* Set the newline character for emitting files. */
            // "stripInternal": true,                            /* Disable emitting declarations that have \`@internal\` in their JSDoc comments. */
            // "noEmitHelpers": true,                            /* Disable generating custom helper functions like \`__extends\` in compiled output. */
            // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
            // "preserveConstEnums": true,                       /* Disable erasing \`const enum\` declarations in generated code. */
            // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
            // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

            /* Interop Constraints */
            // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
            // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
            "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables \`allowSyntheticDefaultImports\` for type compatibility. */
            // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
            "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

            /* Type Checking */
            "strict": true,                                      /* Enable all strict type-checking options. */
            // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied \`any\` type.. */
            // "strictNullChecks": true,                         /* When type checking, take into account \`null\` and \`undefined\`. */
            // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
            // "strictBindCallApply": true,                      /* Check that the arguments for \`bind\`, \`call\`, and \`apply\` methods match the original function. */
            // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
            // "noImplicitThis": true,                           /* Enable error reporting when \`this\` is given the type \`any\`. */
            // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
            // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
            // "noUnusedLocals": true,                           /* Enable error reporting when a local variables aren't read. */
            // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read */
            // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
            // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
            // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
            // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
            // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
            // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
            // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
            // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

            /* Completeness */
            // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
            "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
          }
        }`;

          fs.writeFile(
            folderName + "/tsconfig.json",
            tsconfigContent,
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );

          // FILE: src/scripts/main.ts

          const content = `//   Do the TS stuff here :)
        alert('Hello TypeScript!'); `;

          fs.writeFile(folderName + "/src/scripts/main.ts", content, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }

        //
        // --- SCSS ---
        //
        if (answers.css === "scss") {
          try {
            // FILE: src/styles/sass/main.scss

            const sassyContent = `
/** src/styles/main.scss **/

@use "../../node_modules/zoumixins/cssowl/before" as owl;

.withMixin {
  @include owl.cssowl-before-float("*", 4px 10px 0 0);
}
        `;

            fs.writeFile(
              folderName + "/src/styles/main.scss",
              sassyContent,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          } catch (err) {
            console.error(err);
          }
        }

        //
        // --- Tailwind ---
        //

        if (answers.css === "tailwind") {
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
          fs.writeFile(folderName + "/tailwind.config.js", content, (err) => {
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
          fs.writeFile(
            folderName + "/src/styles/tw-input.css",
            twInputContent,
            (err) => {
              if (err) {
                console.error(err);
              }
              //console.log('src/styles/tw-input.css created.')
            }
          );
        }

        //
        // --- Nunjucks Config ---
        //

        // FILE: nunjucks.config.js

        const njkConfigContent = `
// nunjucks.config.js

const data = {
  appName: '${project}',
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

        fs.writeFile(
          folderName + "/nunjucks.config.js",
          njkConfigContent,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );

        //
        //  --- Package JSON ---
        //

        // FILE: package.json

        let tailwindScript = ``;
        let sassScript = ``;
        let jsScript = ``;
        let tsScript = ``;

        if (answers.css === "tailwind") {
          tailwindScript = `
        "w-tw": "npx tailwindcss -i ./src/styles/tw-input.css -o ./public/tw.css --watch",
        "b-tw": "npx tailwindcss -i ./src/styles/tw-input.css -o ./public/tw.css --minify",`;
        } else {
          tailwindScript = "";
        }
        if (answers.css === "scss") {
          sassScript = `
        "w-sass": "sass  --no-source-map --watch src/styles:public",
        "b-sass": "sass  --no-source-map src/styles:public --style compressed",`;
        } else {
          sassScript = "";
        }
        if (answers.js === "javascript") {
          jsScript = `
        "w-js": "npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --watch",
        "b-js": "npx esbuild src/scripts/main.js --outfile=public/script.js --bundle --minify",`;
        } else {
          jsScript = "";
        }
        if (answers.js === "typescript") {
          tsScript = `
        "w-ts": "npx tsc --watch",
        "b-ts": "npx tsc && npx esbuild public/main.js --minify --outfile=public/main.min.js",`;
        } else {
          tsScript = "";
        }

        let sassPkg = "";
        let twPkg = "";
        let alpinePkg = "";
        let pocketbPkg = "";

        if (answers.css === "scss") {
          sassPkg = '"sass": "^1.69.4",';
        }
        if (answers.css === "tailwind") {
          twPkg = '"tailwindcss": "^3.3.3",';
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
    "build": "npm-run-all --parallel b-*",
    "serve": "alive-server public",
    "dev": "npm-run-all copy b-pages --parallel watch serve",
    "postbuild": "postcss public/css/*.css -u autoprefixer cssnano -r --no-map"
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
    "postcss-cli": "^10.1.0",
    "autoprefixer": "^10.4.16",
    "cssnano": "^6.0.1",
    "zoumacros": "github:AndiKod/zouMacros",
    "zoumixins": "github:AndiKod/zouMixins"
  }
}`;

        fs.writeFile(folderName + "/package.json", pkgJsonContent, (err) => {
          if (err) {
            console.error(err);
          }
        });
        // end create package.json

        //
        // ---------------------- End Message ---------------------- //
        //

        console.log(
          "\n" +
            chalk.magenta("Ok " + chalk.bold(answers.author) + ", you Rock!")
        );
        console.log(
          chalk.bold.whiteBright("Go: ") + "cd " + project + " && npm i"
        );
        console.log(chalk.bold.whiteBright("then: ") + "npm run dev");

        console.log(
          "\n" + chalk.yellowBright.italic("Zou! Happy Coding!") + "\n"
        );
      }
    } catch (err) {
      console.error(err);
    }
  });
