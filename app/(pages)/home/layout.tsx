import React from "react";
import Footer from "./components/footer";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <main className="main-layout">
      {/* <Header /> */}
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
