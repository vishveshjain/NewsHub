// React is automatically imported with JSX in modern React

function TestApp() {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Hello World!</h1>
      <p className="text-gray-600">
        This is a test component to check if basic rendering is working.
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Test Button
      </button>
    </div>
  );
}

export default TestApp;
