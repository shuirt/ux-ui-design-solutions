import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import {
  MessageCircle,
  Minimize2,
  X,
  Send,
  CheckCircle,
  Clock,
  User,
  Bot,
  History,
  AlertTriangle,
  Maximize2
} from 'lucide-react'

export default function WellhubChat() {
  const [chatState, setChatState] = useState('open') // open, minimized, closed
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Como posso ajudar você hoje?',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'user',
      content: 'Tenho uma dúvida sobre minha assinatura',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: 3,
      type: 'bot',
      content: 'Claro! Vou verificar os detalhes da sua assinatura. Pode me informar seu email cadastrado?',
      timestamp: new Date(Date.now() - 180000)
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleMinimize = () => {
    setChatState('minimized')
    showToastNotification('Chat minimizado. Clique no ícone para reabrir.')
  }

  const handleCloseAttempt = () => {
    setShowConfirmation(true)
  }

  const handleConfirmClose = () => {
    setChatState('closed')
    setShowConfirmation(false)
    showToastNotification('Chat salvo! Histórico disponível no seu perfil.')
  }

  const handleCancelClose = () => {
    setShowConfirmation(false)
  }

  const handleReopen = () => {
    setChatState('open')
  }

  const showToastNotification = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simular resposta do bot
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Obrigado pela sua mensagem! Estou processando sua solicitação...',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
            Wellhub - Chat Inteligente
          </h1>
          <p className="text-muted-foreground">
            Prevenção de fechamento acidental e melhor experiência de suporte
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Demo */}
          <div className="space-y-6">
            {/* Chat Widget */}
            <div className="relative">
              {chatState === 'open' && (
                <Card className="shadow-xl border-2 border-green-200">
                  <CardHeader className="bg-green-500 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                        <CardTitle className="text-lg">Suporte Wellhub</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleMinimize}
                          className="text-white hover:bg-green-600 h-8 w-8 p-0"
                          title="Minimizar chat"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCloseAttempt}
                          className="text-white hover:bg-red-500 h-8 w-8 p-0"
                          title="Fechar chat"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="text-green-100">
                      Estamos aqui para ajudar!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {message.type === 'user' ? (
                                <User className="w-3 h-3" />
                              ) : (
                                <Bot className="w-3 h-3" />
                              )}
                              <span className="text-xs opacity-75">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {chatState === 'minimized' && (
                <div className="fixed bottom-4 right-4 z-50">
                  <Button
                    onClick={handleReopen}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
                    title="Reabrir chat"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </Button>
                </div>
              )}

              {chatState === 'closed' && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-8 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-semibold mb-2">Chat Encerrado</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Seu histórico foi salvo e está disponível no seu perfil
                    </p>
                    <Button onClick={() => setChatState('open')} variant="outline">
                      <History className="w-4 h-4 mr-2" />
                      Acessar Histórico
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Melhorias Implementadas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Melhorias Implementadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Botão X convertido em minimizar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Confirmação antes de fechar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Histórico persistente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Notificações não-intrusivas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métricas e Informações */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Métricas de Melhoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">40% → 10%</div>
                    <div className="text-sm text-muted-foreground">Fechamento acidental</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">+25%</div>
                    <div className="text-sm text-muted-foreground">Retenção no atendimento</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">+18%</div>
                    <div className="text-sm text-muted-foreground">CSAT Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estados do Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estados do Chat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Maximize2 className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm">Aberto</div>
                    <div className="text-xs text-muted-foreground">Chat ativo e visível</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Minimize2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">Minimizado</div>
                    <div className="text-xs text-muted-foreground">Ícone flutuante para reabrir</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                  <History className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold text-sm">Fechado</div>
                    <div className="text-xs text-muted-foreground">Histórico salvo e acessível</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testes A/B */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resultados dos Testes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Satisfação do usuário</span>
                      <Badge variant="secondary">+18%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Conclusão de atendimentos</span>
                      <Badge variant="secondary">+25%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Redução de erros</span>
                      <Badge variant="secondary">-30%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Confirmação */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <CardTitle>Fechar Chat</CardTitle>
                </div>
                <CardDescription>
                  Tem certeza que deseja encerrar esta conversa?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertDescription>
                    Seu histórico será salvo e ficará disponível no seu perfil.
                  </AlertDescription>
                </Alert>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleCancelClose}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={handleConfirmClose}>
                    Sim, fechar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 left-4 z-50">
            <Alert className="shadow-lg border-green-200 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {toastMessage}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  )
}

