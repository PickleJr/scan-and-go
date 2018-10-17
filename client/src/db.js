import idb from 'idb';

const dbPromise = idb.open('data-store', 1, upgradeDB => {
    upgradeDB.createObjectStore('data');
});

const idbKeyval = {
    get(key) {
        return dbPromise.then(db => {
            return db.transaction('data')
                .objectStore('data').get(key);
        });
    },
    set(key, val) {
        return dbPromise.then(db => {
            const tx = db.transaction('data', 'readwrite');
            tx.objectStore('data').put(val, key);
            return tx.complete;
        });
    },
    delete(key) {
        return dbPromise.then(db => {
            const tx = db.transaction('data', 'readwrite');
            tx.objectStore('data').delete(key);
            return tx.complete;
        });
    },
    clear() {
        return dbPromise.then(db => {
            const tx = db.transaction('data', 'readwrite');
            tx.objectStore('data').clear();
            return tx.complete;
        });
    },
    keys() {
        return dbPromise.then(db => {
            const tx = db.transaction('data');
            const keys = [];
            const store = tx.objectStore('data');
            // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
            // openKeyCursor isn't supported by Safari, so we fall back
            (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
                if(!cursor) return;
                keys.push(cursor.key);
                cursor.continue();
            });

            return tx.complete.then(() => keys);
        });
    }
};

export default idbKeyval;