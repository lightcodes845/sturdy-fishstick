import localforage from "localforage";

localforage.config({
    driver      : localforage.INDEXEDDB,
    name        : 'myApp',
    version     : 1.0,
    storeName   : 'impc_data',
    description : 'some description'
});

export {localforage}