
export default function HistoryModal({ isOpen, onClose, versions, onRestore }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-3/4 max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Version History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh]">
          {versions.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No versions saved yet</p>
          ) : (
            <div className="space-y-3">
              {versions.map((version, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                  onClick={() => onRestore(version.content)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium">
                      Version {versions.length - index}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {version.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {version.content.substring(0, 200)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}