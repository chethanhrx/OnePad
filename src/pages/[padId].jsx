// src/pages/[padId].jsx
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import Editor from '../components/Editor'
import Toolbar from '../components/Toolbar'
import LockModal from '../components/LockModal'
import HistoryModal from '../components/HistoryModal'
import FileUpload from '../components/FileUpload'
import { FirestoreService } from '../services/firestore'
import { StorageService } from '../services/storage'
import { EncryptionService } from '../services/encryption'

export default function PadPage() {
  const { padId } = useParams()
  const navigate = useNavigate()
  
  const [content, setContent] = useState('')
  const [isLocked, setIsLocked] = useState(false)
  const [password, setPassword] = useState('')
  const [showLockModal, setShowLockModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [versions, setVersions] = useState([])
  const [lastSaved, setLastSaved] = useState(null)

  // Auto-save with debouncing
  const autoSave = useCallback(
    debounce(async (contentToSave) => {
      try {
        let contentToStore = contentToSave
        let isEncrypted = false

        if (password) {
          contentToStore = await EncryptionService.encrypt(contentToSave, password)
          isEncrypted = true
        }

        await FirestoreService.savePad(padId, {
          content: contentToStore,
          isEncrypted,
          hasPassword: !!password
        })

        setLastSaved(new Date())
      } catch (error) {
        console.error('Save error:', error)
      }
    }, 1000),
    [padId, password]
  )

  // Version history save (every 10 seconds of inactivity)
  const saveVersion = useCallback(
    debounce(async (contentToSave) => {
      if (contentToSave.trim()) {
        let contentToStore = contentToSave
        let isEncrypted = false

        if (password) {
          contentToStore = await EncryptionService.encrypt(contentToSave, password)
          isEncrypted = true
        }

        await FirestoreService.saveVersion(padId, contentToStore, isEncrypted)
      }
    }, 10000),
    [padId, password]
  )

  // Load pad data
  useEffect(() => {
    const loadPad = async () => {
      const padData = await FirestoreService.getPad(padId)
      
      if (padData) {
        if (padData.hasPassword && !password) {
          setIsLocked(true)
          setContent('')
          return
        }

        if (padData.isEncrypted && password) {
          try {
            const decrypted = await EncryptionService.decrypt(padData.content, password)
            setContent(decrypted)
            setIsLocked(false)
          } catch (error) {
            setIsLocked(true)
            setContent('')
          }
        } else {
          setContent(padData.content || '')
          setIsLocked(false)
        }
      }
    }

    loadPad()
  }, [padId, password])

  // Real-time sync
  useEffect(() => {
    const unsubscribe = FirestoreService.subscribeToPad(padId, async (padData) => {
      if (padData && !isLocked) {
        if (padData.isEncrypted && password) {
          try {
            const decrypted = await EncryptionService.decrypt(padData.content, password)
            setContent(decrypted)
          } catch (error) {
            // Handle decryption error
          }
        } else if (!padData.isEncrypted) {
          setContent(padData.content || '')
        }
      }
    })

    return () => unsubscribe()
  }, [padId, isLocked, password])

  const handleContentChange = useCallback((newContent) => {
    setContent(newContent)
    if (!isLocked) {
      autoSave(newContent)
      saveVersion(newContent)
    }
  }, [autoSave, saveVersion, isLocked])

  const handleSave = useCallback(() => {
    autoSave.flush()
    saveVersion.flush()
  }, [autoSave, saveVersion])

  const handleLock = useCallback(async (newPassword) => {
    setPassword(newPassword)
    
    if (content) {
      const encrypted = await EncryptionService.encrypt(content, newPassword)
      await FirestoreService.savePad(padId, {
        content: encrypted,
        isEncrypted: true,
        hasPassword: true
      })
    }
    
    setIsLocked(true)
  }, [content, padId])

  const handleUnlock = useCallback(async (unlockPassword) => {
    try {
      const padData = await FirestoreService.getPad(padId)
      if (padData?.isEncrypted) {
        await EncryptionService.decrypt(padData.content, unlockPassword)
        setPassword(unlockPassword)
        setIsLocked(false)
        setShowLockModal(false)
      }
    } catch (error) {
      alert('Wrong password!')
    }
  }, [padId])

  const handleFileUpload = useCallback(async (file) => {
    if (!password) {
      alert('Please set a password first to encrypt files')
      return
    }

    try {
      const encryptedFile = await EncryptionService.encryptFile(file, password)
      await StorageService.uploadFile(padId, file, encryptedFile)
      alert('File uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('File upload failed')
    }
  }, [padId, password])

  const handleRestoreVersion = useCallback(async (versionContent) => {
    setContent(versionContent)
    setShowHistoryModal(false)
    await autoSave(versionContent)
  }, [autoSave])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Toolbar
        onLock={() => setShowLockModal(true)}
        onHistory={() => setShowHistoryModal(true)}
        onFileUpload={() => setShowFileUpload(true)}
        isLocked={isLocked}
        padId={padId}
      />
      
      <Editor
        content={content}
        onChange={handleContentChange}
        onSave={handleSave}
        isLocked={isLocked}
      />

      <LockModal
        isOpen={showLockModal}
        onClose={() => setShowLockModal(false)}
        onLock={handleLock}
        onUnlock={handleUnlock}
        isLocked={isLocked}
      />

      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        versions={versions}
        onRestore={handleRestoreVersion}
      />

      <FileUpload
        isOpen={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onUpload={handleFileUpload}
        padId={padId}
      />

      {lastSaved && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-gray-300 px-3 py-2 rounded-lg text-sm">
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}