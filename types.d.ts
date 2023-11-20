declare module 'ejs-mate';
declare module 'express'
declare module '@mapbox/mapbox-sdk/services/geocoding'

//  TypeScript relies on type definitions to understand the types and structures of modules, and when these aren't provided, it will raise an error.
// The suggestion provided by VSCode, npm i --save-dev @types/ejs-mate, is a common way to resolve such issues. The @types/ namespace on npm is reserved for type declarations, and many popular libraries have corresponding type declaration packages there. However, not all libraries have type declarations available.
// In your case, it seems the issue resolved itself. Sometimes, the internal cache of VSCode can cause it to not recognize certain modules. Simply restarting VSCode can clear this up.
// For anyone else facing a similar issue, if there's no type declaration available for a module and you don't want to write one yourself, you can create a declaration file (e.g., types.d.ts) in your project and add the line declare module 'module-name';. This tells TypeScript to treat the module as any type, effectively bypassing type checks for that module.