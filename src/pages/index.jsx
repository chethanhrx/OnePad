import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [padId, setPadId] = useState('')
  const [stars, setStars] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Replace with your actual GitHub username and repo
  const GITHUB_USERNAME = 'chethanhrx'
  const GITHUB_REPO = 'OnePad'
  const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}`

  // Fetch GitHub stars
  useEffect(() => {
    const fetchStars = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}`)
        if (response.ok) {
          const data = await response.json()
          setStars(data.stargazers_count)
        }
      } catch (error) {
        console.log('Could not fetch GitHub stars')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchStars()
  }, [])

  const handleCreatePad = (e) => {
    e.preventDefault()
    if (padId.trim()) {
      navigate(`/${padId.trim()}`)
    }
  }

  const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 8)
    setPadId(randomId)
  }

  const redirectToGitHub = () => {
    window.open(GITHUB_URL, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative">
      {/* GitHub Stars Button - Top Right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={redirectToGitHub}
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-lg px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          <div className="flex items-center space-x-2 relative z-10">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            <span>Star</span>
            {!isLoading && stars !== null && (
              <span className="bg-black bg-opacity-30 px-2 py-1 rounded text-sm font-bold">
                {stars}
              </span>
            )}
            {isLoading && (
              <span className="bg-black bg-opacity-30 px-2 py-1 rounded text-sm font-bold">
                ...
              </span>
            )}
          </div>
        </button>
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Logo + App Name */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            {/* Add your logo here */}
            <img 
              src="/logo.png" 
              alt="OnePad Logo"
              className="w-12 h-12 rounded-lg"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              OnePad
            </h1>
          </div>
          <p className="text-gray-300">
            Create encrypted notepads with real-time sync
          </p>
        </div>

        <form onSubmit={handleCreatePad} className="mt-8 space-y-6">
          <div>
            <input
              type="text"
              value={padId}
              onChange={(e) => setPadId(e.target.value)}
              placeholder="Enter pad name"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={generateRandomId}
              className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Random ID
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create Pad
            </button>
          </div>
        </form>

        {/* Alternative GitHub Button - Below the form */}
        <div className="text-center">
          <button
            onClick={redirectToGitHub}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            <span className="font-medium">Star on GitHub</span>
            {stars !== null && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-sm">
                {stars}
              </span>
            )}
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Every URL is its own encrypted notepad</p>
          <p className="mt-2">Auto-save • Version History • File Attachments</p>
        </div>
      </div>
    </div>
  )
}