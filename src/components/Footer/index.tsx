import React from "react";
import classes from "./index.module.scss";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <div id={classes["footer"]}>
      <p>
        Copyright &copy; {new Date().getFullYear()} IMPC. All rights
        reserved
      </p>
    </div>
  );
};

export default Footer;