import Nav from '@/components/Nav/Nav'
import '@/styles/global.css'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: 'Bitcoin Tool',
  description: 'Bitcoin Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Bitcoin Tool</title>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
