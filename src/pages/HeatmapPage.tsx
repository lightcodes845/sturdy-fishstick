import React, { useEffect, useContext, useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { PlotData, SelectData } from "../dataTypes";
import { DataContext, DataContextType } from "../context/DataContextProvider";
import DataPagination from "../components/DataPagination";
import FilterControls from "../components/FilterControls";
import Heatmap from "../components/Heatmap";
import SelectPerPage from "../components/SelectPerPage";

function HeatmapPage() {
  const {
    fullData,
    loading,
    genes,
    phenotypes,
    geneTotalPhenotypeCount,
    error,
  } = useContext(DataContext) as DataContextType;
  const [plotData, setPlotData] = useState<PlotData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [elementsPerPage, setElementsPerPage] = useState<number>(25);
  const [selectedPhenotypes, setSelectedPhenotypes] = useState<
    SelectData[] | null
  >(null);
  const [selectedGenes, setSelectedGenes] = useState<SelectData[] | null>(null);
  const [genePhenotypeCountRange, setGenePhenotypeCountRange] = useState<number>(0);
  const [genePhenotypeCountRangeFilterTotal, setGenePhenotypeCountRangeFilterTotal] = useState<number>(0);
  const [genePhenotypeCountRangePage, setGenePhenotypeCountRangePage] = useState<number>(1);
  const [genePhenotypeCountRangePerPage, setGenePhenotypeCountRangePerPage] = useState<number>(25);
  const genePhenotypeCountRangeRef = useRef<number>(0);

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const paginateGenePhenotypeCountRange = (pageNumber: number) => {
    setGenePhenotypeCountRangePage(pageNumber);
  };

  useEffect(() => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    //set plotData based on selectedGenes
    if (selectedGenes && selectedGenes.length > 0) {
      //find intersection of selectedGenes and fullData
      const selectedData = fullData.filter((gene) =>
        selectedGenes.some((selected_gene) => selected_gene.value === gene.id)
      );

      setPlotData(selectedData);
      //set plotData based on selectedPhenotypes
    } else if (selectedPhenotypes && selectedPhenotypes.length > 0) {
      const selectedData = fullData.map((gene) => {
        //find intersection of selectedPhenotypes and top level phenotypes
        const filteredData = gene.data.filter((top_level_phenotype) =>
          selectedPhenotypes.some((phenotype) => phenotype.value === top_level_phenotype.x)
        );
        return { ...gene, data: filteredData };
      });
      setPlotData(
        selectedData.slice((page - 1) * elementsPerPage, page * elementsPerPage)
      );
    } else {
      setPlotData(
        fullData.slice((page - 1) * elementsPerPage, page * elementsPerPage)
      );
    }
  }, [elementsPerPage, page, fullData, selectedPhenotypes, selectedGenes]);

  useEffect(() => {
    //set plotData based on range filter for the sum of genes phenotype count
    if (genePhenotypeCountRange > 0) {
      //Get filter level (index in the sorted geneTotalPhenotypeCount) based on the genePhenotypeCountRange selected percentile
      const filterLevel = Math.round(
        (genePhenotypeCountRange / 100) * geneTotalPhenotypeCount.length
      );
      // Get ids for genes below filter level (index level)
      const ids = geneTotalPhenotypeCount
        .filter((gene, i) => i < filterLevel)
        .map((gene) => gene.id);
      // Get data for genes below filter level
      const selectedData = fullData.filter((data) => ids.includes(data.id));
      // Sort data based on order of ids
      selectedData.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

      // if the genePhenotypeCountRange is decreased, the page should be reset to 1
      if (genePhenotypeCountRangeRef.current > genePhenotypeCountRange) {
        setGenePhenotypeCountRangePage(1);
      }

      //for pagination
      setGenePhenotypeCountRangeFilterTotal(selectedData.length);

      setPlotData(
        selectedData.slice(
          (genePhenotypeCountRangePage - 1) * genePhenotypeCountRangePerPage,
          genePhenotypeCountRangePage * genePhenotypeCountRangePerPage
        )
      );
      genePhenotypeCountRangeRef.current = genePhenotypeCountRange;
    } else {
      setPlotData(
        fullData.slice((page - 1) * elementsPerPage, page * elementsPerPage)
      );
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genePhenotypeCountRange, geneTotalPhenotypeCount, genePhenotypeCountRangePage, genePhenotypeCountRangePerPage, fullData]);

  return (
    <div
      className={"container w-100 h-100"}
      style={{ marginTop: "110px", minHeight: "50rem" }}
    >
      <h1 className="text-center my-3">IMPC Heatmap</h1>
      {error && (
        <div className="alert alert-danger p-4" role="alert">
          <p className="text-center fs-2">
            There was an issue fetching data from the server.
          </p>
          <p className="text-center fs-2">{error}</p>
          <p className="text-center fs-2">Please refresh page to try again.</p>
        </div>
      )}
      {loading && (
        <div className="d-flex justify-content-center w-100">
          <Spinner className="spinner" animation="border" variant="dark" />
        </div>
      )}
      {fullData && fullData.length > 0 && (
        <>
          <FilterControls
            genes={genes}
            disableGeneSelect={
              !!(selectedPhenotypes && selectedPhenotypes.length > 0) ||
              genePhenotypeCountRange > 0
            }
            setSelectedGenes={setSelectedGenes}
            selectedGenes={selectedGenes}
            disablePhenotypeSelect={
              !!(selectedGenes && selectedGenes.length > 0) || genePhenotypeCountRange > 0
            }
            phenotypes={phenotypes}
            setSelectedPhenotypes={setSelectedPhenotypes}
            setGenePhenotypeCountRange={setGenePhenotypeCountRange}
            genePhenotypeCountRange={genePhenotypeCountRange}
            selectedPhenotypes={selectedPhenotypes}
            disableGenePhenotypeCountRange={
              !!(selectedGenes && selectedGenes.length > 0) ||
              !!(selectedPhenotypes && selectedPhenotypes.length > 0)
            }
          />
          <Heatmap data={plotData} />
          {(selectedGenes && selectedGenes.length > 0) ||
          genePhenotypeCountRange > 0 ? null : (
            <div className="d-flex align-items-center justify-content-center">
              <SelectPerPage
                id={"elementsPerPage"}
                value={elementsPerPage}
                paginate={paginate}
                setElementsPerPage={setElementsPerPage}
              />
              <DataPagination
                elementsPerPage={elementsPerPage}
                totalElements={fullData.length}
                activePage={page}
                paginate={paginate}
              />
            </div>
          )}
          {/*  For Gene Range */}
          {genePhenotypeCountRange > 0 && (
            <div className="d-flex align-items-center justify-content-center">
              <SelectPerPage
                id={"genePhenotypeCountRangePerPage"}
                value={genePhenotypeCountRangePerPage}
                paginate={paginateGenePhenotypeCountRange}
                setElementsPerPage={setGenePhenotypeCountRangePerPage}
              />
              <DataPagination
                elementsPerPage={genePhenotypeCountRangePerPage}
                totalElements={genePhenotypeCountRangeFilterTotal}
                activePage={genePhenotypeCountRangePage}
                paginate={paginateGenePhenotypeCountRange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HeatmapPage;
