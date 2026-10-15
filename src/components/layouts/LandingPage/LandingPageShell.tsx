"use client"

import Footer from "./Footer";
import Navbar from "./Navbar";

interface TypeProps {
  children: React.ReactNode;
}
const LandingPageShell = (props: TypeProps) => {
  const {
    children
  } = props;

  const nameApp = "HelpDesk"

  return (
    <div className="w-full max-w-[3000px] mx-auto">
      <Navbar nameApp={nameApp} />

      {children}

      <Footer nameApp={nameApp} />
    </div>
  )
}

export default LandingPageShell;