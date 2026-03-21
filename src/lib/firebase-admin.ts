import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getPrivateKey(): string {
  return getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

/**
 * Lazy init so missing/invalid env doesn't crash at import time (which would
 * return an HTML error page instead of JSON from API routes).
 */
function getFirebaseAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  return initializeApp({
    credential: cert({
      projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
      clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
      privateKey: getPrivateKey(),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: Storage | null = null;

export function getAdminAuth(): Auth {
  if (!_auth) _auth = getAuth(getFirebaseAdminApp());
  return _auth;
}

export function getAdminDb(): Firestore {
  if (!_db) _db = getFirestore(getFirebaseAdminApp());
  return _db;
}

export function getAdminStorage(): Storage {
  if (!_storage) _storage = getStorage(getFirebaseAdminApp());
  return _storage;
}
