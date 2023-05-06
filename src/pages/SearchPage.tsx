import React, {useContext, useEffect, useState} from "react";
import Select from "react-select";
import { DataContext, DataContextType } from "../context/DataContextProvider";
import { PlotData, SelectData } from "../dataTypes";
import classes from "../sass/pages/searchpage.module.scss";
import { Spinner } from "react-bootstrap";

type Props = {};

const SearchPage: React.FC<Props> = () => {
  const { fullData, genes, loading, error } = useContext(
    DataContext
  ) as DataContextType;
  const [selectedGenes, setSelectedGenes] = useState<SelectData | null>(null);
  const [searchResult, setSearchResult] = useState<PlotData | string | null>(
    null
  );

  useEffect(() => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  const searchHandler = () => {
    const result = fullData.find((row) => {
      return selectedGenes?.value === row.id;
    });
    setSearchResult(result ? result : "No results found");
  };
  return (
    <div className={classes.search_page}>
      <div className="container">
        <h2 className="text-center mb-3">Search For Gene</h2>
        {error && (
          <div className="alert alert-danger p-4" role="alert">
            <p className="text-center fs-2">
              There was an issue fetching data from the server.
            </p>
            <p className="text-center fs-2">{error}</p>
            <p className="text-center fs-2">
              Please refresh page to try again.
            </p>
          </div>
        )}
        {loading && (
          <div className="d-flex justify-content-center w-100">
            <Spinner className="spinner" animation="border" variant="dark" />
          </div>
        )}
        {fullData && fullData.length > 0 && (
          <>
            <div className="row h-100 mb-5">
              <div className="offset-md-4 col-12 col-md-4">
                <div className="">
                  {/*<label htmlFor="geneSelect">Search for Gene from list</label>*/}
                  <Select
                    id="geneSelect"
                    options={genes}
                    placeholder="Search for gene..."
                    onChange={(e) => {
                      if (e) {
                        setSelectedGenes(e as SelectData);
                      }
                    }}
                  />
                </div>
              </div>
              <div
                className={`${classes.search_page_col} col-12 col-md-2 mt-3 mt-md-0`}
              >
                <div className="h-100 d-flex align-items-end">
                  <button
                    onClick={searchHandler}
                    className={`btn btn-primary ${classes.search_page_button} w-100`}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            {typeof searchResult === "string" && (
              <div>
                <h2 className={"text-center"}>Gene Result</h2>
                <h3 className="text-center">No results found</h3>
              </div>
            )}
            {typeof searchResult === "object" && searchResult && (
              <div>
                {/*<h2 className={""}>Gene Result</h2>*/}
                <h3 className="mb-3">
                  Gene Name (Marker Accession ID):{" "}
                  {`${searchResult.id} (${searchResult.data[0].marker_accession_id})`}
                </h3>
                {searchResult.data.map((row) => {
                  return (
                    <div key={row.top_level_mp_term_id} className="mb-3">
                      <h4 className={classes.search_page_top_term}>
                        Top Level Phenotype Term:{" "}
                        <span style={{ textTransform: "capitalize" }}>
                          {row.x}
                        </span>{" "}
                        ({row.top_level_mp_term_id})
                      </h4>
                      <h5
                        className={`${classes.search_page_phenotype_count} mb-3`}
                      >
                        Significant associated phenotypes:{" "}
                        {row.y === -10 ? "No Association" : row.y}
                      </h5>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div>
                            <h5 className="fw-bold">Phenotype Systems</h5>
                            {row.procedures.length > 0 ? (
                              row.procedures.map((procedure, index) => {
                                return (
                                  <div key={index}>
                                    <p>{procedure}</p>
                                  </div>
                                );
                              })
                            ) : (
                              <p>
                                No available procedures for this gene in this
                                phenotype system
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div>
                            <h5 className="fw-bold">Other Phenotype Terms</h5>
                            {row.phenotype_terms.length > 0 ? (
                              row.phenotype_terms.map((term) => {
                                return (
                                  <div key={term.mp_term_id}>
                                    <p>{`${term.mp_term_name} (${term.mp_term_id})`}</p>
                                  </div>
                                );
                              })
                            ) : (
                              <p>No significant phenotype term</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
