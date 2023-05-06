import React from "react";
import { Zoom, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import classes from "./index.module.scss";

type Props = {};

const Hero: React.FC<Props> = (props: Props) => {
  return (
    <div className={`${classes.hero} bg-light`}>
      {/*<div className={classes.hero_bg}>*/}
        <Container className="h-100 w-100">
          <div className="row h-100">
            <div className="col-12 col-md-6 col-xl-7">
              <div className={classes.hero_text}>
                <Zoom className="h-100" duration={1000} triggerOnce>
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
                    <div>
                      <Link to={"/heatmap"} className={`btn ${classes.hero_text_content_heatmap}`}>View Heatmap</Link>
                      <Link to={"/search"} className={`btn ${classes.hero_text_content_search}`}>Search Gene</Link>
                    </div>
                  </div>
                </Zoom>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-5 d-none d-md-block">
              <div className={classes.hero_image}>
                <Slide className="w-100" direction={"right"} duration={1000} triggerOnce>
                  <div className={classes.hero_image_content}>
                      <img
                        src="/images/embryo_1_1.webp"
                        alt="hero"
                        className="img-fluid"
                      />
                  </div>
                </Slide>
              </div>
            </div>
          </div>
        </Container>
      {/*</div>*/}
    </div>
  );
};

export default Hero;
