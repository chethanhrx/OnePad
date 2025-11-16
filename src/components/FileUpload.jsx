
import { useState, useRef } from 'react'

export default function FileUpload({ isOpen, onClose, onUpload, padId }) {
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleUpload = async () => {
    for (const file of files) {
      await onUpload(file)
    }
    setFiles([])
    onClose()
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold text-white mb-4">Upload Files</h2>
        
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Click to select files
          </button>
          <p className="text-gray-400 text-sm mt-2">Files will be encrypted</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2 mb-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                <span className="text-white text-sm truncate flex-1">
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}