import React, { useEffect, useContext, useState } from "react";
import { PlotData, SelectData } from "../dataTypes";
import Heatmap from "../components/Heatmap";
import DataPagination from "../components/DataPagination";
import { Spinner } from "react-bootstrap";
import { DataContext, DataContextType } from "../context/DataContextProvider";
import FilterControls from "../components/FilterControls";

function HeatmapPage() {
  const { fullData, loading, genes, phenotypes, rangeFilterData } = useContext(
    DataContext
  ) as DataContextType;
  const [plotData, setPlotData] = useState<PlotData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [elementsPerPage, setElementsPerPage] = useState<number>(25);
  const [selectedPhenotypes, setSelectedPhenotypes] = useState<
    SelectData[] | null
  >(null);
  const [selectedGenes, setSelectedGenes] = useState<SelectData[] | null>(null);
  const [geneRange, setGeneRange] = useState<number>(0);

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (selectedGenes && selectedGenes.length > 0) {
      //find intersection of selectedGenes and fullData
      const selectedData = fullData.filter((d) =>
        selectedGenes.some((s) => s.value === d.id)
      );

      setPlotData(selectedData);
    } else if (selectedPhenotypes && selectedPhenotypes.length > 0) {
      const selectedData = fullData.map((d) => {
        //find intersection of selectedPhenotypes and d.data
        const filteredData = d.data.filter((dd) =>
          selectedPhenotypes.some((s) => s.value === dd.x)
        );
        return { ...d, data: filteredData };
      });
      setPlotData(
        selectedData.slice((page - 1) * elementsPerPage, page * elementsPerPage)
      );
    } else if (geneRange > 0) {
      const filterLevel = Math.round(
        (geneRange / 100) * rangeFilterData.length
      );
      const ids = rangeFilterData
        .filter((d, i) => i < filterLevel)
        .map((d) => d.id);
      const selectedData = fullData.filter((d) => ids.includes(d.id));
      selectedData.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      setPlotData(selectedData);
    } else {
      setPlotData(
        fullData.slice((page - 1) * elementsPerPage, page * elementsPerPage)
      );
    }
  }, [
    elementsPerPage,
    page,
    fullData,
    selectedPhenotypes,
    selectedGenes,
    geneRange,
    rangeFilterData,
  ]);

  return (
    <div className={"container w-100 h-100"} style={{ marginTop: "110px" }}>
      <h1 className="text-center my-3">IMPC Heatmap</h1>
      {loading ? (
        <div className="d-flex justify-content-center w-100">
          <Spinner className="spinner" animation="border" variant="dark" />
        </div>
      ) : (
        <>
          <FilterControls
            genes={genes}
            disableGeneSelect={
              !!(selectedPhenotypes && selectedPhenotypes.length > 0) ||
              geneRange > 0
            }
            setSelectedGenes={setSelectedGenes}
            disablePhenotypeSelect={
              !!(selectedGenes && selectedGenes.length > 0) || geneRange > 0
            }
            phenotypes={phenotypes}
            setSelectedPhenotypes={setSelectedPhenotypes}
            setGeneRange={setGeneRange}
            geneRange={geneRange}
            disableGeneRange={
              !!(selectedGenes && selectedGenes.length > 0) ||
              !!(selectedPhenotypes && selectedPhenotypes.length > 0)
            }
          />
          {fullData && <Heatmap data={plotData} />}
          {(selectedGenes && selectedGenes.length > 0) || geneRange > 0
            ? null
            : fullData && (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="me-3">
                    <label htmlFor="elementsPerPage">Showing&nbsp;&nbsp;</label>
                    <select
                      name="elementsPerPage"
                      id="elementsPerPage"
                      onChange={(e) => {
                        setElementsPerPage(parseInt(e.target.value));
                        paginate(1);
                      }}
                    >
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{" "}
                    genes per page
                  </div>
                  <DataPagination
                    elementsPerPage={elementsPerPage}
                    totalElements={fullData.length}
                    activePage={page}
                    paginate={paginate}
                  />
                </div>
              )}
        </>
      )}
    </div>
  );
}

export default HeatmapPage;
