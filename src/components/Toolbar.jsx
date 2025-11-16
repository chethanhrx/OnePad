export default function Toolbar({ 
  onLock, 
  onHistory, 
  onFileUpload, 
  isLocked,
  padId 
}) {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo + App Name */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="OnePad Logo"
              className="w-8 h-8 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-white">OnePad</h1>
          </div>
          <span className="text-white opacity-80">/{padId}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onFileUpload}
            className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white font-medium hover:bg-opacity-30 transition-all backdrop-blur-sm"
          >
            Upload File
          </button>
          
          <button
            onClick={onHistory}
            className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white font-medium hover:bg-opacity-30 transition-all backdrop-blur-sm"
          >
            History
          </button>
          
          <button
            onClick={onLock}
            className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white font-medium hover:bg-opacity-30 transition-all backdrop-blur-sm"
          >
            {isLocked ? '🔒' : '🔓'} Lock
          </button>
        </div>
      </div>
    </div>
  )
}