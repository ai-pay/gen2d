import { MainHeader } from "@/components/header";
import Image from "next/image";

export default async function Home() {

  return <>
    <MainHeader />
    <main className="flex min-h-screen flex-col items-center justify-start w-[90vw] sm:w-[512px] mx-auto gap-3 text-center">
      <h1>Hey I&apos;m Marcus, the developer of this website. <a 
        href="https://twitter.com/marcus_ai_pay"
        className="text-blue-500 hover:underline"
      >Follow me on twitter</a>.</h1>
      <p>My email is m_gunny31@outlook.com</p>
      <p>I am a software engineer who is passionate about AI and web development. I love to create projects that combine both of these interests. This website is one of those projects.</p>
      <Image 
        className="w-[90vw] h-[90vw] sm:w-[512px] sm:h-[512px] object-cover rounded-lg shadow-lg"
        width={1024}
        height={1024}
        src="https://img.gen2d.dev/fb3fc15a-de64-4f05-913f-0449412d41c0-1024.jpg" alt={"Profile image"} />
    </main>
  </>;
}
