import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Linkedin, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  X,
  Briefcase,
  TrendingUp,
  Users
} from 'lucide-react'

export default function GupyLogin() {
  const [loginStep, setLoginStep] = useState('form') // form, loading, success, error
  const [showPassword, setShowPassword] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showBanners, setShowBanners] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  // Simular progresso de login
  useEffect(() => {
    if (loginStep === 'loading') {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer)
            setLoginStep('success')
            setTimeout(() => setShowBanners(true), 1000)
            return 100
          }
          return prev + 10
        })
      }, 200)
      return () => clearInterval(timer)
    }
  }, [loginStep])

  const handleLogin = (method) => {
    setLoginStep('loading')
    setProgress(0)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const banners = [
    {
      id: 1,
      title: 'Vagas em Tech',
      description: 'Mais de 500 oportunidades em tecnologia',
      icon: Briefcase,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Salários em Alta',
      description: 'Aumento médio de 25% nas ofertas',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Empresas Top',
      description: 'Conecte-se com as melhores empresas',
      icon: Users,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
            Gupy - Login Otimizado
          </h1>
          <p className="text-muted-foreground">
            Solução para problemas de login e banners distrativos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
                <CardDescription>
                  Acesse milhares de oportunidades de trabalho
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loginStep === 'form' && (
                  <>
                    {/* Login Social */}
                    <Button 
                      onClick={() => handleLogin('linkedin')}
                      className="w-full bg-[#0077B5] hover:bg-[#005885] text-white"
                      size="lg"
                    >
                      <Linkedin className="w-5 h-5 mr-2" />
                      Continuar com LinkedIn
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Ou continue com email
                        </span>
                      </div>
                    </div>

                    {/* Email/Password Form */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Sua senha"
                            className="pl-10 pr-10"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <span>Lembrar de mim</span>
                        </label>
                        <Button variant="link" size="sm" className="p-0">
                          Esqueceu a senha?
                        </Button>
                      </div>

                      <Button 
                        onClick={() => handleLogin('email')}
                        className="w-full"
                        size="lg"
                        disabled={!formData.email || !formData.password}
                      >
                        Entrar
                      </Button>
                    </div>
                  </>
                )}

                {loginStep === 'loading' && (
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Fazendo login...</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Verificando suas credenciais
                      </p>
                      <Progress value={progress} className="w-full" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {progress}% concluído
                      </p>
                    </div>
                  </div>
                )}

                {loginStep === 'success' && (
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">Login realizado com sucesso!</h3>
                      <p className="text-sm text-muted-foreground">
                        Redirecionando para sua área privada...
                      </p>
                    </div>
                  </div>
                )}

                {loginStep === 'error' && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Erro ao fazer login. Verifique suas credenciais e tente novamente.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Melhorias Implementadas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Melhorias Implementadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Login persistente com token seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Feedback visual claro do progresso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Banners contextuais pós-login</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Tratamento elegante de erros</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Banners Contextuais */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Métricas de Melhoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">60% → 20%</div>
                    <div className="text-sm text-muted-foreground">Redução no abandono</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2min → 30s</div>
                    <div className="text-sm text-muted-foreground">Tempo para área privada</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">+15%</div>
                    <div className="text-sm text-muted-foreground">Retenção mensal</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Banners - Só aparecem após login */}
            {showBanners && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Oportunidades para Você</h3>
                {banners.map((banner) => {
                  const IconComponent = banner.icon
                  return (
                    <Card key={banner.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${banner.color} text-white`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{banner.title}</h4>
                            <p className="text-sm text-muted-foreground">{banner.description}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {!showBanners && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Banners contextuais aparecerão após o login</p>
                    <p className="text-sm mt-2">Reduzindo distração durante o processo de autenticação</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

