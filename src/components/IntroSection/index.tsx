import React from "react";
import classes from './index.module.scss';

type Props = {};

const IntroSection: React.FC<Props> = () => {
  return (
    <section className={classes.intro_section}>
      <div className={classes.intro_section_main}>
        <div className="container">
          <h2 className={`${classes.intro_section_header} text-center`}>Introduction to IMPC Embryo Data</h2>
          <div className="row gx-5 flex-column-reverse flex-lg-row">
            <div className="col-12 col-lg-6">
              <div className="d-flex align-items-center justify-content-center">
                <figure className={classes.intro_section_figure}>
                  <img className={classes.intro_section_image} src="/images/embryo_2.png" alt="Embryo" />
                  <figcaption className="text-center">Image of a Mouse Embryo after 3 weeks</figcaption>
                </figure>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className={classes.intro_section_text}>
                <p>
                  Up to one third of homozygous knockout lines are lethal, which
                  means no homozygous mice or less than expected are observed past
                  the weaning stage (IMPC{" "}
                  <a
                      href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7"
                      target="_blank"
                      rel="noreferrer"
                  >
                    Viability Primary Screen procedure
                  </a>
                  ). Early death may occur during embryonic development or soon
                  after birth, during the pre-weaning stage. For this reason, the
                  IMPC established a{" "}
                  <a
                      href="https://www.mousephenotype.org/impress"
                      target="_blank"
                      rel="noreferrer"
                  >
                    systematic embryonic phenotyping pipeline
                  </a>{" "}
                  to morphologically evaluate mutant embryos to ascertain the
                  primary perturbations that cause early death and thus gain
                  insight into gene function.
                </p>
                <p>
                  As determined in IMPReSS (see interactive diagram{" "}
                  <a
                      href="https://www.mousephenotype.org/impress"
                      target="_blank"
                      rel="noreferrer"
                  >
                    here
                  </a>
                  ), all embryonic lethal lines undergo gross morphology
                  assessment at E12.5 (embryonic day 12.5) to determine whether
                  defects occur earlier or later during embryonic development. A
                  comprehensive imaging platform is then used to assess
                  dysmorphology. Embryo gross morphology, as well as 2D and 3D
                  imaging are actively being implemented by the IMPC for lethal
                  lines.
                </p>
                <p>
                  Read more in our paper on{" "}
                  <a
                      href="https://europepmc.org/article/PMC/5295821"
                      target="_blank"
                      rel="noreferrer"
                  >
                    High-throughput discovery of novel developmental phenotypes,
                    Nature 2016.
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
