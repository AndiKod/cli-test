# zou-create

CLI tool generating [Zou!JS](https://github.com/AndiKod/zoujs) projects.

*— Zou! is a french interjection that stands for: JustDoIt! GoAhead!*

Simple and easy to understand SSG setup, with close to zero configuration or dependencies but flexible enough to craft web projects or fire a quick sandbox and try things from a curated list of CDN's, Macros & Mixins. 


```
npx zou-create myWebsite
```

Zou! will ask for:

- The Author's name
- SCSS or Tailwind
- Javascript or TypeScript

then scaffold an SSG boilerplate setup, ready to `npm install` and `npm run dev` for browser serving with hot reload, the usual "Vite-like" things. 

Built around [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) the Folders structure looks like that:

- **Data:** Food for .njk loops & tags
- **Layouts:** Genral templates/html-skeletons
- **Macros:** Styled components, functionalities,...
- **Pages:** Extending a layout. The content.
- **Partials:** Sub-pages to be included in others
- **Scripts:** The JavaScripts sits in here, or TS
- **Static:** Assets to be copied to public
- **Styles:** CSS or SCSS / Tailwind

Once created, aditional or alternative CSS/JS packages can be installed or tested via the CDN Loader included in [zouMacros](https://github.com/AndiKod/zouMacros), before eventually "npm install" them ...or not.

## SCSS / Javascript Flavor

It generates SCSS starting files with partials, paired with [OpenProps](https://open-props.style/#getting-started) for theming and light/dark setup (included). Something like [SmolCSS](https://smolcss.dev/) could be integrated soon along with maybe a few utilities or mixins to fill the gaps. 

Some SCSS Mixins can be loaded from [zouMixins](https://github.com/AndiKod/zouMixins) on top of the custom ones made locally. The majority of what mixins was used for, are now better served by OpenProps, but will try to find some use cases.

The Javascript is processed by ESBuild, and [Hyperscript](https://hyperscript.org/docs/#basics) is loaded for some fun frontend DOM interactivity. If you prefer something like AlpineJS, it's available in the CDN Loader.

## Alternatives

If you need to go with a quick Bulma, Bootstrap or experiment with htmX, you sure can as they (and others) are waiting to be activated. Just go `{{ cdn.pkg('htmx') }}` after importing the macro.


### Tailwind

For Tailwind lovers, all it take is chosing it instead of SCSS when scaffolding a new project. It creates the `tailwind.config.js` and the entry point file in `src/styles`. For the rest, do your thing.

*PS: On some spare moments, take a look at BonsaiCSS from the CDN Loader*

### Typescript

If for whatever reason you want to go TypeScript while crafting your website or little app, just pick TS at the prompt. It will scaffold a basic `tsconfig` file in the root, a TypeScript main file and the scripts to watch/build it.




*It's still an early stage exploration process, so many things ahead ...until then, Happy Coding!*






