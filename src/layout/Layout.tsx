import { FC, ReactNode } from "react";

type IProps = {
  children: ReactNode;
};

const Layout: FC<IProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;
