// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCrA9N1juZhyNqaEyQ1SqThwt2xGKceR2I',
    authDomain: 'shoplist-ivo.firebaseapp.com',
    databaseURL: 'https://shoplist-ivo.firebaseio.com',
    projectId: 'shoplist-ivo',
    storageBucket: 'shoplist-ivo.appspot.com',
    messagingSenderId: '625676542279',
  }
};
