import React from "react";
import classes from "./index.module.scss";

type Props = {};

const LethalLines: React.FC<Props> = (props: Props) => {
  return (
    <section className={classes.lethal_section}>
      <div>
        <div className="container">
          <h2 className={classes.lethal_section_header}>Determining Lethal Lines</h2>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className={classes.lethal_section_text}>
                <p>
                  The IMPC assesses each gene knockout line for viability
                  (Viability Primary Screen{" "}
                  <a
                    href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7"
                    target="_blank"
                    rel="noreferrer"
                  >
                    IMPC_VIA_001
                  </a>
                  ). In this procedure, the proportion of homozygous pups is
                  determined soon after birth, during the preweaning stage, in
                  litters produced from mating heterozygous animals. A line is
                  declared lethal if no homozygous pups for the null allele are
                  detected at weaning age, and subviable if pups homozygous for
                  the null allele constitute less than 12.5% of the litter.
                </p>
                <p>
                  Lethal strains are further phenotyped in the{" "}
                  <a
                    href="https://www.mousephenotype.org/impress"
                    target="_blank"
                    rel="noreferrer"
                  >
                    embryonic phenotyping pipeline
                  </a>
                  . For embryonic lethal and subviable strains, heterozygotes
                  are phenotyped in the IMPC{" "}
                  <a
                    href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7"
                    target="_blank"
                    rel="noreferrer"
                  >
                    adult phenotyping pipeline
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex align-items-center justify-content-start">
                <figure className={classes.lethal_section_figure}>
                  <img
                    className={classes.lethal_section_image}
                    src="/images/embryo_3.png"
                    alt="Embryo"
                  />
                  <figcaption className="text-center">
                    Image of a Mouse Embryo after 1 week
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LethalLines;
