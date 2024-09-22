import GlobalStyle from "./GlobalStyle";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <GlobalStyle />
      <body>{children}</body>
    </html>
  )
}
