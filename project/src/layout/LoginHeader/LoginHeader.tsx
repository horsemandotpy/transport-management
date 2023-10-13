import React from "react";
import { imagines } from "../../assets";
import { LoginHeaderLogoWrapper, LoginHeaderWraper } from "./loginHeaderStyle";

const LoginHeader = () => {
  return (
    <LoginHeaderWraper>
      <LoginHeaderLogoWrapper>
        <img src={imagines.logoHeader} alt="techlead-logo" />
      </LoginHeaderLogoWrapper>
    </LoginHeaderWraper>
  );
};

export default LoginHeader;
