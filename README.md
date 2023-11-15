# zou-create

HTML, CSS, JS & FUN

Just go:

```
npx zou-create myWebsite
```

Zou will ask you some questions like
- The Author's name
- SCSS or Tailwind
- JS or TS

Folders and files will be generated, so you could `cd myWebsite`, `npm i` then `npm run dev`.

Zou!JS simply brings together:

- Layouts
- Partials
- dynamic Pages
- Components via Macros & Filters
- SCSS Mixins libraries
- Macros libraries (CDN loader, i18n, ...)
- Backend possible via PocketBase & AlpineJS

with basically no dependencies or overload.


Once inside you can pick among some CSS flavors or JS packages from the layouts:

```
{% import '../../node_modules/zoumacros/lib/cdn.njk' as cdn %}
    
{{ cdn.pkg('bulma') }}
```

https://github.com/AndiKod/zou




*It's still an exploration process, so many things ahead.*