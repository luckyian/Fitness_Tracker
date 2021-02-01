let db;
// create a new db request for a "budget" database.
const request = window.indexedDB.open("budget", 1);
request.onupgradeneeded = function (event) {
  // create object store called "pending" and set autoIncrement to true
  const db = event.target.result;

  // Creates an object store
  const pendingStore = db.createObjectStore("pending");
  // Creates a statusIndex that we can query on.
  pendingStore.createIndex("statusIndex", "status");
  pendingStore.autoIncrement;
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(err);
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  // add record to your store with add method.
  const db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");
  pendingStore.add(record);
}

function checkDatabase() {
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable
  request.onsuccess = () => {
    const pendingStore = transaction.objectStore("pending");
    pendingStore.onsuccess = () => {
      const getAll = statusIndex.getAll("records");
      getAll.onsuccess = () => {
        console.log(getAll.result);
      };
    }
  
  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
          request.onsuccess = () => {
            const pendingStore = transaction.objectStore("pending");

            pendingStore.onsuccess = () => {
              const clearStore = objectStore.clear(pendingStore);
              clearStore;
            };
          }

        });
    }
  };
}
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
