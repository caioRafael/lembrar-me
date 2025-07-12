import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { MemoriesContainer } from '../_components/memories-container'

export default async function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-dark-title mb-3">
          Lembre-se do que precisa
        </h2>
        <p className="text-description text-lg max-w-2xl mx-auto">
          Guarde experiências importantes e tenha sempre à mão os detalhes para
          repeti-las no futuro
        </p>
      </div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soft-blue h-5 w-5" />
          <Input
            placeholder="Buscar nas suas lembranças..."
            className="pl-11 border-soft-blue focus-primary bg-card-white text-dark-title placeholder:text-description h-12 text-base"
          />
        </div>
      </div>
      <MemoriesContainer />
    </div>
  )
}
