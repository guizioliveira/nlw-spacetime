import React from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const baiJanjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-janjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'A time capsule builded with React, Nextjs and Tailwindcss',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJanjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
