// src/lib/firestore.ts
import {
  collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc,
  Timestamp, query, orderBy,
} from 'firebase/firestore';
import { db } from './firebase';

const COL = 'readings';

export type Reading = {
  id?: string;
  createdAt: Timestamp;
  bpm: number;
  status: 'APTO' | 'NAO_APTO';
  note?: string;
  username: string;
};

export async function listReadings(): Promise<Reading[]> {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Reading, 'id'>) }));
}

export async function getReading(id: string): Promise<Reading | null> {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<Reading, 'id'>) }) : null;
}

export async function createReading(data: Omit<Reading, 'id' | 'createdAt'>) {
  const payload: Reading = { ...data, createdAt: Timestamp.now() };
  const ref = await addDoc(collection(db, COL), payload as any);
  return ref.id;
}

export async function updateReading(id: string, data: Partial<Reading>) {
  const ref = doc(db, COL, id);
  await updateDoc(ref, data as any);
}

export async function removeReading(id: string) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);
}
