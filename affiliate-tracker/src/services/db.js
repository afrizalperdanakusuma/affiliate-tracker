// src/utils/db.js
// IndexedDB wrapper for AffiliTrack
// All data stays in the user's browser — fully private

const DB_NAME = 'affilitrack_v1'
const DB_VERSION = 1

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (e) => {
      const db = e.target.result

      if (!db.objectStoreNames.contains('ads')) {
        const adsStore = db.createObjectStore('ads', { keyPath: 'id' })
        adsStore.createIndex('date', 'date', { unique: false })
        adsStore.createIndex('campaign', 'campaign', { unique: false })
      }

      if (!db.objectStoreNames.contains('affiliate')) {
        const affStore = db.createObjectStore('affiliate', { keyPath: 'id' })
        affStore.createIndex('date', 'date', { unique: false })
        affStore.createIndex('campaign', 'campaign', { unique: false })
      }
    }

    request.onsuccess = (e) => resolve(e.target.result)
    request.onerror = (e) => reject(e.target.error)
  })
}

// Generate unique key: date + campaign name
export function makeRecordId(date, campaign) {
  const slug = (campaign || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
  return `${date}__${slug}`
}

// Upsert: insert new OR overwrite existing record
export function upsertRecords(db, storeName, records) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    let inserted = 0
    let updated = 0

    const processNext = (index) => {
      if (index >= records.length) {
        resolve({ inserted, updated })
        return
      }
      const record = records[index]
      const getReq = store.get(record.id)

      getReq.onsuccess = (e) => {
        if (e.target.result) {
          updated++
        } else {
          inserted++
        }
        store.put(record)
        processNext(index + 1)
      }
      getReq.onerror = () => processNext(index + 1)
    }

    processNext(0)
    tx.onerror = (e) => reject(e.target.error)
  })
}

export function getAllRecords(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly')
    const req = tx.objectStore(storeName).getAll()
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}

export function clearStore(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    const req = tx.objectStore(storeName).clear()
    req.onsuccess = () => resolve()
    req.onerror = (e) => reject(e.target.error)
  })
}
