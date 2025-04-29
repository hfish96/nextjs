import './globals.css'

export const metadata = {
  title: '简约股票 - 智能形态变化UI',
  description: '提供精简易用的股票监控与分析工具',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="font-[Poppins] bg-gradient-to-br from-dark-950 to-dark-850 min-h-screen text-gray-300">
        {children}
      </body>
    </html>
  )
}
