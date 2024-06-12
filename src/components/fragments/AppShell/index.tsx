import Toaster from "@/components/ui/Toaster";
import { Lato } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "admin", "member"];

type PropType = {
  children: React.ReactNode;
};

const AppShell = (props: PropType) => {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  //   useEffect(() => {
  //     setToaster({
  //       variant: "success",
  //       message: "Testing",
  //     });
  //   });

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
};

export default AppShell;
