import React from "react";
import { Zoom } from "react-awesome-reveal";
import { Container } from "react-bootstrap";
import classes from "./index.module.scss";

type Props = {};

const Hero: React.FC<Props> = (props: Props) => {
  return (
    <div className={`${classes.hero} bg-light`}>
      <div className={classes.hero_bg}>
        <Container className="h-100 w-100">
          <div className={classes.hero_text}>
            <Zoom className="h-100" duration={1500} triggerOnce>
              <div className={classes.hero_text_content}>
                <div>
                  <h1 className={classes.hero_text_title}>
                    Welcome to the <br />
                    <span className={classes.hero_text_title_span}>
                International Mouse
                <br /> Phenotyping Consortium
              </span>{" "}
                  </h1>
                  <p className={classes.hero_text_description}>
                    New age of phenotyping data for the world
                  </p>
                </div>
              </div>
            </Zoom>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
