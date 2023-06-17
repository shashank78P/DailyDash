import Image from 'next/image'
import Logo from './components/Logo'
import SideBar from './components/GlobalComponents/sideBar/SideBar'
import BellIco from './components/assets/BellIco'

export default function Home() {
  return (
    <main className="bg-white h-screen w-full">
      <SideBar />
    </main>
  )
}
