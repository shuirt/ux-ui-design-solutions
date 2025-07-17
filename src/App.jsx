import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ArrowRight, Users, MessageCircle, Filter, Home } from 'lucide-react'
import GupyLogin from './components/GupyLogin'
import WellhubChat from './components/WellhubChat'
import OlxFilters from './components/OlxFilters'
import './App.css'

function HomePage() {
  const cases = [
    {
      id: 'gupy',
      title: 'Gupy - Sistema de Login Otimizado',
      description: 'Solução para problemas de login via LinkedIn e excesso de banners distrativos',
      icon: Users,
      metrics: ['60% → 20% abandono', '2min → 30s acesso', '+15% retenção'],
      color: 'bg-blue-500',
      path: '/gupy'
    },
    {
      id: 'wellhub',
      title: 'Wellhub - Chat Interface Inteligente',
      description: 'Prevenção de fechamento acidental do chat e melhoria na experiência de suporte',
      icon: MessageCircle,
      metrics: ['40% → 10% fechamento acidental', '+25% retenção', '+18% CSAT'],
      color: 'bg-green-500',
      path: '/wellhub'
    },
    {
      id: 'olx',
      title: 'OLX - Sistema de Filtros Responsivo',
      description: 'Filtros otimizados com melhor performance e experiência mobile',
      icon: Filter,
      metrics: ['50% → <5% falhas', '15s → 4s busca', '+20% retenção'],
      color: 'bg-purple-500',
      path: '/olx'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Soluções UX/UI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Três casos reais de problemas de UX/UI resolvidos com React e Tailwind CSS
          </p>
          <Badge variant="secondary" className="mt-4">
            React + Tailwind + Responsivo
          </Badge>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cases.map((caseItem) => {
            const IconComponent = caseItem.icon
            return (
              <Card key={caseItem.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${caseItem.color} text-white`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {caseItem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {caseItem.metrics.map((metric, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                  <Link to={caseItem.path}>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      Ver Solução
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Características das Soluções</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Responsivo</h3>
              <p className="text-sm text-muted-foreground">Design adaptativo para todos os dispositivos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">Otimizado para velocidade e eficiência</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">♿</span>
              </div>
              <h3 className="font-semibold mb-2">Acessível</h3>
              <p className="text-sm text-muted-foreground">Seguindo padrões WCAG 2.1 AA</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Moderno</h3>
              <p className="text-sm text-muted-foreground">Design system consistente e atual</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Home className="w-5 h-5" />
              Soluções UX/UI
            </Link>
            <div className="flex gap-4">
              <Link to="/gupy">
                <Button variant="ghost" size="sm">Gupy</Button>
              </Link>
              <Link to="/wellhub">
                <Button variant="ghost" size="sm">Wellhub</Button>
              </Link>
              <Link to="/olx">
                <Button variant="ghost" size="sm">OLX</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gupy" element={<GupyLogin />} />
          <Route path="/wellhub" element={<WellhubChat />} />
          <Route path="/olx" element={<OlxFilters />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

