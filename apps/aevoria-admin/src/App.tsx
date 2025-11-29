import { AEVButton } from '@aevoria/ui'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Aevoria Admin
        </h1>
        <p className="text-gray-600 mb-6">
          Bienvenue sur le panneau d'administration
        </p>
        <div className="flex gap-4 justify-center">
          <AEVButton variant="primary">Primary</AEVButton>
          <AEVButton variant="secondary">Secondary</AEVButton>
          <AEVButton variant="outline">Outline</AEVButton>
        </div>
      </div>
    </div>
  )
}

export default App

