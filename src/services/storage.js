
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  listAll,
  deleteObject 
} from 'firebase/storage'
import { storage } from './firebase'

export class StorageService {
  static async uploadFile(padId, file, encryptedBlob) {
    const fileRef = ref(storage, `pads/${padId}/${file.name}.encrypted`)
    await uploadBytes(fileRef, encryptedBlob)
    return await getDownloadURL(fileRef)
  }

  static async getFiles(padId) {
    const folderRef = ref(storage, `pads/${padId}`)
    const result = await listAll(folderRef)
    return result.items
  }

  static async downloadFile(fileRef) {
    return await getDownloadURL(fileRef)
  }

  static async deleteFile(fileRef) {
    await deleteObject(fileRef)
  }
}