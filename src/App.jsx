function App() {
  return (
    <div className="min-h-screen bg-dark-base text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">OnePad is Working! 🎉</h1>
        <p className="text-gray-300">Deployment successful!</p>
        <button 
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium"
          onClick={() => alert('It works!')}
        >
          Test Button
        </button>
      </div>
    </div>
  )
}

export default App