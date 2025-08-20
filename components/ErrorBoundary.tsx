'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Bug, Home, ExternalLink } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('错误边界捕获到错误:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-red-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-large border border-white/20 p-8 text-center relative z-10 animate-fade-in">
            {/* 错误图标 */}
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                <Bug className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* 错误标题 */}
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              出现了一些问题
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              应用程序遇到了一个错误。请尝试刷新页面或重新加载。
              <br />
              <span className="text-sm text-gray-500">
                如果问题持续存在，请联系技术支持
              </span>
            </p>

            {/* 操作按钮 */}
            <div className="space-y-4 mb-6">
              <button
                onClick={this.handleRetry}
                className="btn-primary w-full text-lg py-3"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                重试
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary text-lg py-3"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  刷新页面
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="btn-secondary text-lg py-3"
                >
                  <Home className="w-5 h-5 mr-2" />
                  返回首页
                </button>
              </div>
            </div>

            {/* 错误详情 */}
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200 flex items-center gap-2 justify-center">
                  <ExternalLink className="w-4 h-4" />
                  查看错误详情
                </summary>
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="text-xs text-red-700 font-mono overflow-auto max-h-32">
                    <div className="font-semibold mb-2">错误信息:</div>
                    <div className="text-red-600">{this.state.error.message}</div>
                    {this.state.error.stack && (
                      <>
                        <div className="font-semibold mt-3 mb-2">堆栈跟踪:</div>
                        <div className="text-red-600 whitespace-pre-wrap">{this.state.error.stack}</div>
                      </>
                    )}
                  </div>
                </div>
              </details>
            )}

            {/* 底部提示 */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                错误ID: {Date.now().toString(36)}
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 