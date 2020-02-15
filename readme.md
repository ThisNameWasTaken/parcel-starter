# Parcel Starter

This is a simple [Parcel](https://parceljs.org/) boilerplate to get you up and running.

## Scripts

```sh
npm start
```

Starts development server on [http://localhost:1234](http://localhost:1234).

To change the host and port run `npm start -- --host local.my-host.com --port 3000`

```sh
npm run build
```

Builds for production into a folder called `dist`.

To change the folder's name run `npm run build -- -out-dir custom-named-folder`.

For more flags checkout [Parcel's CLI](https://parceljs.org/cli.html) Docs.

## Included packages

The only runtime dependency is [normalize.css](https://necolas.github.io/normalize.css/) which a lightweight css framework that makes browsers render all elements more consistently.

Parcel and [SASS](https://sass-lang.com/) are the only dev dependencies. However if you wish to use things such as [TypeScript](https://www.typescriptlang.org/), [EJS](https://ejs.co/) or any other language supersets, Parcel will automatically add those as dev dependencies.
