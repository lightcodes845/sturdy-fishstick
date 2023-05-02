import React from "react";
import classes from "./index.module.scss";
import Select from "react-select";
import { SelectData } from "../../dataTypes";
import { Form } from "react-bootstrap";

type Props = {
  genes: SelectData[];
  disableGeneSelect: boolean;
  setSelectedGenes: (e: SelectData[]) => void;
  disablePhenotypeSelect: boolean;
  phenotypes: SelectData[];
  setSelectedPhenotypes: (e: SelectData[]) => void;
  geneRange: number;
  disableGeneRange: boolean;
  setGeneRange: (e: number) => void;
};

const FilterControls: React.FC<Props> = ({
  genes,
  disableGeneSelect,
  setSelectedGenes,
  disablePhenotypeSelect,
  phenotypes,
  setSelectedPhenotypes,
  geneRange,
  disableGeneRange,
  setGeneRange,
}) => {
  return (
    <div className={classes.filter_controls}>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="my-3">
            <label htmlFor="geneSelect">Filter by gene list</label>
            <Select
              id="geneSelect"
              isMulti={true}
              options={genes}
              placeholder="Choose a list of genes..."
              isDisabled={disableGeneSelect}
              onChange={(e) => {
                if (e) {
                  setSelectedGenes(e as SelectData[]);
                }
              }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="my-3">
            <label htmlFor="phenotypeSelect">
              Filter by significant phenotype system
            </label>
            <Select
              id="phenotypeSelect"
              isMulti={true}
              placeholder="Choose a list of phenotypes..."
              isDisabled={disablePhenotypeSelect}
              options={phenotypes}
              onChange={(e) => {
                if (e) {
                  setSelectedPhenotypes(e as SelectData[]);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <div>
            <Form.Label>
              Filter top {geneRange}% of the genes that have the highest
              phenotype count
            </Form.Label>
            <Form.Range
              disabled={disableGeneRange}
              value={geneRange}
              onChange={(e) => {
                setGeneRange(Number(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
