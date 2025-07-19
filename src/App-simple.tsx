import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function SimpleIndex() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-4">dalil.dz - Test Simple</h1>
      <p className="text-lg text-gray-700">Si vous voyez ceci, React fonctionne !</p>
      <div className="mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Statut du système</h2>
        <ul className="space-y-2">
          <li className="flex items-center text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            React chargé
          </li>
          <li className="flex items-center text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Styles Tailwind actifs
          </li>
          <li className="flex items-center text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Routage fonctionnel
          </li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<SimpleIndex />} />
      </Routes>
    </Router>
  );
}

export default App;