import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { ListaIngs } from "@/components/ListaIngs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Just Eat</title>
      </Head>
      <body>
        <ListaIngs></ListaIngs>
      </body>
    </>
  );
}
