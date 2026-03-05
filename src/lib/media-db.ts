// Simple IndexedDB Helper for persistent local media storage
const DB_NAME = "HairClubMediaDB";
const STORE_NAME = "media";

export const initDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        if (typeof window === "undefined") return;
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
            if (!request.result.objectStoreNames.contains(STORE_NAME)) {
                request.result.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const saveMedia = async (key: string, blob: Blob) => {
    const db = await initDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, key);
    return new Promise((r) => (tx.oncomplete = () => r(true)));
};

export const getMedia = async (key: string) => {
    const db = await initDB();
    if (!db) return null;
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(key);
    return new Promise<Blob | null>((resolve) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
    });
};

export const deleteMedia = async (key: string) => {
    const db = await initDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(key);
    return new Promise((r) => (tx.oncomplete = () => r(true)));
};
