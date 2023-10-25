import Image from 'next/image'
import Logo from '../components/Logo'
import SideBar from '../components/GlobalComponents/sideBar/SideBar'
import BellIco from '../components/assets/BellIco'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Provider } from 'react-redux';
import Store from '../components/store/root';

export default function Home() {
  return (
    <main className="bg-white text-c_black h-screen w-full">
      {/* <SideBar /> */}
    </main>
  )
}


// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   console.log("context here ==>", ctx)
//   const queries = ctx.query;
//   console.log("queries", queries)
//   return {
//     props: {
//       queries: queries
//     }
//   }
// }