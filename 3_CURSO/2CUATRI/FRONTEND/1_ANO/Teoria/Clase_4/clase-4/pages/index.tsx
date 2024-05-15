import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const name = "Tato"
  return (
    <>
    <div>
    <Link href="/menu">Main Menu</Link>
    </div>
    </>
  )
}
