import React from "react";
import { Container } from "react-bootstrap";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { BsCardImage } from "react-icons/bs";
import { BsFillFolderFill } from "react-icons/bs";
import { ImArrowUpRight2 } from "react-icons/im";
import { AiTwotoneApi } from "react-icons/ai";
import classes from "./index.module.scss";

type Props = {};

const AccessData: React.FC<Props> = (props: Props) => {
  return (
    <section className={classes.data_section}>
      <div>
        <Container>
          <h2 className={classes.data_section_header}>
            Accessing Embryo Phenotype Data
          </h2>
          <p className={classes.data_section_sub_header}>
            Embryo phenotype data can be accessed in multiple ways
          </p>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-xl-3">
              <div>
                <div className={`${classes.data_section_card} card`}>
                  <div className="card-body d-flex justify-content-between flex-column">
                    <div>
                      <div className="my-4 ms-2">
                        <BsFillBarChartLineFill
                            className={classes.data_section_card_icon}
                        />
                      </div>
                      <h5 className="card-title">
                        Embryo Images: interactive heatmap{" "}
                      </h5>
                      <p
                          className={`${classes.data_section_card_text} card-text`}
                      >
                        A compilation of all our Embryo Images, organised by gene
                        and life stage, with access to the Interactive Embryo
                        Viewer, where you can compare mutants and wild types side
                        by side and rotate 2D and 3D images; we also provide
                        access to our external partners' embryo images.
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <a
                        href="https://github.com/mpi2/EBI02126-web-developer/blob/main/data/embryo_imaging"
                        target="_blank"
                        rel="noreferrer"
                        className={classes.data_section_card_link}
                      >
                        View More <ImArrowUpRight2 />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <div>
                <div className={`${classes.data_section_card} card`}>
                  <div className="card-body d-flex justify-content-between flex-column">
                    <div>
                      <div className="my-4 ms-2">
                        <BsCardImage
                          className={classes.data_section_card_icon}
                        />
                      </div>
                      <h5 className="card-title">Embryo Vignettes </h5>
                      <p
                        className={`${classes.data_section_card_text} card-text`}
                      >
                        Showcase of best embryo images with detailed
                        explanations.
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <a
                        href="https://github.com/mpi2/EBI02126-web-developer/blob/main/data/embryo/vignettes"
                        target="_blank"
                        rel="noreferrer"
                        className={classes.data_section_card_link}
                      >
                        View More <ImArrowUpRight2 />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <div>
                <div className={`${classes.data_section_card} card`}>
                  <div className="card-body d-flex justify-content-between flex-column">
                    <div>
                      <div className="my-4 ms-2">
                        <BsFillFolderFill
                          className={classes.data_section_card_icon}
                        />
                      </div>
                      <h5 className="card-title">FTP Site </h5>
                      <p
                        className={`${classes.data_section_card_text} card-text`}
                      >
                        From the FTP site, latest release of all our results. Reports need to be
                        filtered by a dedicated column, Life Stage (E9.5, E12.5,
                        E15.5 and E18.5). Please check the README file or see
                        documentation.
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <a
                        href="https://www.mousephenotype.org/help/non-programmatic-data-access/"
                        target="_blank"
                        rel="noreferrer"
                        className={classes.data_section_card_link}
                      >
                        View More <ImArrowUpRight2 />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <div>
                <div className={`${classes.data_section_card} card`}>
                  <div className="card-body d-flex justify-content-between flex-column">
                    <div>
                      <div className="my-4 ms-2">
                        <AiTwotoneApi
                            className={classes.data_section_card_icon}
                        />
                      </div>
                      <h5 className="card-title">REST API </h5>
                      <p
                          className={`${classes.data_section_card_text} card-text`}
                      >
                        You can use our latest REST APIs to access our data.
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <a
                          href="https://www.mousephenotype.org/help/programmatic-data-access/"
                          target="_blank"
                          rel="noreferrer"
                          className={classes.data_section_card_link}
                      >
                        View More <ImArrowUpRight2 />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default AccessData;
