import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: '简闻',
  description: '看新闻，观股票',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="font-[Poppins] bg-gradient-to-br from-dark-950 to-dark-850 min-h-screen text-gray-300 pt-16">
        <Header />
        {children}
      </body>
    </html>
  )
}
