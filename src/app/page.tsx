import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight, Brain, Camera, Shield, Tag } from 'lucide-react'
import Link from 'next/link'
import Dashboard from '@/assets/dashboard.png'
import MemoryDetail from '@/assets/memory-detail.png'
import MemoryImage from '@/assets/memory-image.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">lembrar-me</h1>
              <p className="text-xs text-gray-600">Suas memórias importantes</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Entrar
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href={'/register'}>Crie uma conta</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
            ✨ Nunca mais esqueça momentos importantes
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Guarde suas <span className="text-blue-600">memórias</span> de forma
            inteligente
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            O lembrar-me é sua biblioteca pessoal de experiências. Cadastre
            atividades, momentos especiais e conhecimentos importantes para
            nunca mais perdê-los.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Criar Minha Primeira Lembrança
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-transparent"
            >
              Ver Como Funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interface simples e intuitiva
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Organize suas memórias com facilidade usando nossa interface
              moderna e responsiva
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
              <Image
                src={Dashboard.src}
                alt="Dashboard do lembrar-me mostrando interface de memórias"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
              <Image
                src={MemoryDetail.src}
                alt="Dashboard do lembrar-me mostrando interface de memórias"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
              <Image
                src={MemoryImage.src}
                alt="Dashboard do lembrar-me mostrando interface de memórias"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Recursos que fazem a diferença
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto">
              Desenvolvido para ser sua ferramenta definitiva de organização de
              memórias e experiências
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Memórias com Fotos</CardTitle>
                <CardDescription>
                  Anexe imagens às suas lembranças para torná-las ainda mais
                  vívidas e memoráveis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Sistema de Tags</CardTitle>
                <CardDescription>
                  Organize suas memórias com tags personalizadas para encontrar
                  rapidamente o que procura
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Dados Seguros</CardTitle>
                <CardDescription>
                  Suas memórias são protegidas com criptografia de ponta e
                  backup automático
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">lembrar-me</h3>
                  <p className="text-xs text-gray-400">
                    Suas memórias importantes
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                A plataforma definitiva para organizar e preservar suas memórias
                mais importantes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Integrações
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Comunidade
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 lembrar-me. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
