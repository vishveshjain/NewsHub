// React is automatically imported with JSX in modern React

function SimpleApp() {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">NewsHub Simple Test</h1>
      <p className="text-gray-600 mb-6">
        This is a simple test component to verify that React rendering is working correctly.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Test Card 1</h2>
          <p className="text-gray-700">
            This is a test card to verify that Tailwind CSS styling is working correctly.
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Test Card 2</h2>
          <p className="text-gray-700">
            This is another test card to verify that the grid layout is working correctly.
          </p>
        </div>
      </div>
      
      <button 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => alert('Button clicked!')}
      >
        Test Button
      </button>
    </div>
  );
}

export default SimpleApp;
