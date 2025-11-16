
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

export class FirestoreService {
  static async getPad(padId) {
    const docRef = doc(db, 'pads', padId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data() : null
  }

  static async savePad(padId, data) {
    const docRef = doc(db, 'pads', padId)
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true })
  }

  static subscribeToPad(padId, callback) {
    const docRef = doc(db, 'pads', padId)
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data())
      }
    })
  }

  static async saveVersion(padId, content, isEncrypted = false) {
    const versionsRef = collection(db, 'versions')
    await addDoc(versionsRef, {
      padId,
      content,
      isEncrypted,
      createdAt: serverTimestamp()
    })
  }

  static async getVersions(padId) {
    // This would be implemented with a proper query
    // For now, return empty array
    return []
  }
}