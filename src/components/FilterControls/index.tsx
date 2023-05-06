import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import { SelectData } from "../../dataTypes";
import classes from "./index.module.scss";

type Props = {
  genes: SelectData[];
  disableGeneSelect: boolean;
  setSelectedGenes: (e: SelectData[]) => void;
  disablePhenotypeSelect: boolean;
  phenotypes: SelectData[];
  setSelectedPhenotypes: (e: SelectData[]) => void;
  selectedPhenotypes: SelectData[] | null;
  selectedGenes: SelectData[] | null;
  genePhenotypeCountRange: number;
  disableGenePhenotypeCountRange: boolean;
  setGenePhenotypeCountRange: (e: number) => void;
};

const FilterControls: React.FC<Props> = ({
  genes,
  disableGeneSelect,
  setSelectedGenes,
  disablePhenotypeSelect,
  phenotypes,
  setSelectedPhenotypes,
  selectedPhenotypes,
  genePhenotypeCountRange,
  disableGenePhenotypeCountRange,
  setGenePhenotypeCountRange,
  selectedGenes
}) => {

  const resetHandler = () => {
    if(selectedGenes && selectedGenes.length > 0){
      setSelectedGenes([])
    }
    if(selectedPhenotypes && selectedPhenotypes.length > 0){
        setSelectedPhenotypes([])
    }
    if(genePhenotypeCountRange > 0){
      setGenePhenotypeCountRange(0)
    }
  }

  return (
    <div className={classes.filter_controls}>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <div className="my-3">
            <label htmlFor="geneSelect">Filter by gene list</label>
            <Select
              id="geneSelect"
              isMulti={true}
              options={genes}
              value={selectedGenes}
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
              value={selectedPhenotypes}
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
              Filter top {genePhenotypeCountRange}% of the genes that have the highest
              phenotype count
            </Form.Label>
            <div className={"d-flex"}>
              <span>0%&nbsp;&nbsp;</span>
              <Form.Range
                  disabled={disableGenePhenotypeCountRange}
                  value={genePhenotypeCountRange}
                  onChange={(e) => {
                    setGenePhenotypeCountRange(Number(e.target.value));
                  }}
              />
                <span>&nbsp;&nbsp;100%</span>
            </div>
          </div>
        </div>
        <div className="offset-md-4 mt-3 mt-md-0 col-12 col-md-2">
            <div className="h-100 d-flex align-items-center">
                <button onClick={resetHandler} className={`btn btn-primary w-100 ${classes.filter_controls_button}`}>
                    Reset Controls
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
