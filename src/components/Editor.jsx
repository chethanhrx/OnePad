
import { useState, useEffect, useCallback } from 'react'

export default function Editor({ 
  content, 
  onChange, 
  onSave, 
  isLocked,
  placeholder = "Start typing..." 
}) {
  const [localContent, setLocalContent] = useState(content)

  useEffect(() => {
    setLocalContent(content)
  }, [content])

  const handleChange = useCallback((e) => {
    const newContent = e.target.value
    setLocalContent(newContent)
    onChange(newContent)
  }, [onChange])

  const handleBlur = useCallback(() => {
    onSave()
  }, [onSave])

  return (
    <div className="flex-1 p-6">
      <textarea
        value={localContent}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLocked}
        placeholder={isLocked ? "Pad is locked. Click the lock button to unlock." : placeholder}
        className="w-full h-full bg-gray-900 text-gray-100 resize-none border-none outline-none p-4 rounded-lg font-mono text-lg leading-relaxed placeholder-gray-500"
        style={{ minHeight: '500px' }}
      />
    </div>
  )
}