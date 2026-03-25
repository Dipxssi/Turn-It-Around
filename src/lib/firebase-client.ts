"use client";

import { getApps, initializeApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

function getClientEnv(name: string): string {
  return process.env[name]?.trim() || "";
}

export function isFirebaseClientConfigured(): boolean {
  return Boolean(
    getClientEnv("NEXT_PUBLIC_FIREBASE_API_KEY") &&
      getClientEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID")
  );
}

function getFirebaseProjectId(): string {
  return (
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT?.trim() ||
    ""
  );
}

function getFirebaseConfig() {
  if (!isFirebaseClientConfigured()) {
    throw new Error(
      "Firebase client is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID."
    );
  }

  return {
    apiKey: getClientEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain:
      getClientEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN") ||
      (getFirebaseProjectId()
        ? `${getFirebaseProjectId()}.firebaseapp.com`
        : undefined),
    projectId: getClientEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: getClientEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET") || undefined,
    appId: getClientEnv("NEXT_PUBLIC_FIREBASE_APP_ID") || undefined,
  };
}

let _auth: Auth | null = null;
let _db: Firestore | null = null;

export function getFirebaseAuth(): Auth {
  if (_auth) return _auth;
  const app = getApps()[0] || initializeApp(getFirebaseConfig());
  _auth = getAuth(app);
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (_db) return _db;
  const app = getApps()[0] || initializeApp(getFirebaseConfig());
  _db = getFirestore(app);
  return _db;
}
