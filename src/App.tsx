import React, { useEffect, useReducer, useState } from "react";
import Select from "react-select";
import { localforage } from "./storage";
import { Data, PlotData, SelectData } from "./dataTypes";
import { convertToPlotFormat } from "./utilities";
import Heatmap from "./components/Heatmap";
import DataPagination from "./components/DataPagination";
import fullDataReducer, {
  INITIAL_STATE,
  ActionTypes,
} from "./reducers/fullDataReducer";
import { Form, Spinner } from "react-bootstrap";
import classes from "./App.module.scss";

function App() {
  const [
    { fullData, loading, genes, phenotypes, rangeFilterData },
    dispatch,
  ] = useReducer(fullDataReducer, INITIAL_STATE);
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
    const fetchData = async () => {
      dispatch({ type: ActionTypes.FETCH_FULL_DATA_START });
      // Get data from indexedDB if it exists, otherwise fetch it from the github gist
      let storedData = await localforage.getItem<Data[]>("impc_data");

      if (storedData) {
        const result = convertToPlotFormat(storedData);
        dispatch({
          type: ActionTypes.FETCH_FULL_DATA_SUCCESS,
          payload: {
            data: result.plotData,
            genes: result.genes,
            phenotypes: result.phenotypeTerms,
            rangeFilterData: result.forRangeFilter,
          },
        });
        setPlotData(result.plotData.slice(0, elementsPerPage));
      } else {
        try {
          const response = await fetch(
            "https://gist.githubusercontent.com/ficolo/c722ebbd6722135d1c60699193ff91ba/raw/bd11cbbb8f39106fe994af759e5ac97f79bd51d3/gene_phenotypes.json"
          );
          const dd = await response.json();
          localforage.setItem("impc_data", dd);
          const result = convertToPlotFormat(dd);
          dispatch({
            type: ActionTypes.FETCH_FULL_DATA_SUCCESS,
            payload: {
              data: result.plotData,
              genes: result.genes,
              phenotypes: result.phenotypeTerms,
              rangeFilterData: result.forRangeFilter,
            },
          });
          setPlotData(result.plotData.slice(0, elementsPerPage));
        } catch (e: any) {
          dispatch({
            type: ActionTypes.FETCH_FULL_DATA_FAILURE,
            payload: { error: e.message },
          });
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className={"container w-100 h-100"}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
        distinctio explicabo id in minus officiis quaerat sequi tenetur totam
        ut! Consequatur enim esse est et ex excepturi facilis labore, laboriosam
        laudantium libero minus mollitia rerum sapiente tempore, unde, veniam
        vitae. Ab aliquid aspernatur, delectus dolore eaque eveniet laboriosam
        magnam nulla, optio quibusdam, repellendus sed temporibus tenetur. Alias
        dolor dolore sequi totam vel. A asperiores, debitis eligendi, fugiat
        ipsa minima necessitatibus nemo non, perspiciatis provident quidem sequi
        tempora veniam. Aperiam ea, enim esse, ipsa magni maxime minus nobis
        officia praesentium rerum sint veniam? Ad alias aperiam atque commodi
        delectus dolorum earum eius eos est eveniet, hic illo impedit in ipsam
        modi nam necessitatibus nesciunt nisi nulla odit officia quia rem saepe
        sint veniam voluptas voluptate voluptatum? Alias aspernatur consectetur
        consequatur impedit magni maxime minus modi officia perspiciatis
        possimus quisquam quos reiciendis repellendus, sed, soluta ullam unde
        velit. Architecto at beatae culpa delectus dignissimos dolor enim eos
        eum excepturi, illum ipsam laborum libero minus nihil nulla obcaecati
        praesentium quidem quis sed soluta sunt veniam vitae. Eaque, eos ipsa
        maxime nam rerum tenetur ut vel vitae. Dolore doloribus error labore
        perspiciatis, soluta vel veniam voluptatibus voluptatum. Amet assumenda
        beatae consequatur doloribus eius, expedita iste molestias nam
        necessitatibus nemo nesciunt omnis optio placeat porro quae quaerat quas
        quidem quos rem tempora totam veritatis voluptatem! Commodi ducimus
        fugit odit praesentium rem! Accusamus animi consectetur, consequatur
        dolorum, eos et, excepturi ipsa neque nihil non odit officia repellat!
        Animi aperiam cumque cupiditate dignissimos dolore dolorum ducimus est
        harum, illum inventore ipsam maiores nemo nostrum numquam, officia
        pariatur praesentium qui quisquam quo quod quos recusandae reiciendis
        rem sequi similique suscipit tenetur totam ullam voluptas voluptate?
        Commodi eius error laborum modi quasi, ratione similique tempore
        veritatis? Adipisci, asperiores aut consequatur delectus eveniet itaque
        minus nemo pariatur praesentium, quia quidem, quos repellendus unde
        voluptatem voluptatum. Aliquid aperiam assumenda cumque ea eius est, id
        nam. Aliquam, aperiam architecto asperiores consectetur eius facilis id
        ipsa maiores nam nihil odit pariatur, quas reprehenderit, rerum saepe
        sequi voluptatum. Beatae dolorum in laboriosam laudantium mollitia sunt
        ut. A ab adipisci aliquid aut consequuntur corporis cumque debitis
        deserunt dicta dignissimos dolor dolores dolorum eos eum eveniet
        explicabo fugiat hic illum in inventore ipsam maxime modi nemo non
        officiis pariatur quas, quasi reiciendis sequi sit tempora, unde
        voluptas voluptate. A aspernatur autem deserunt dignissimos
        exercitationem laudantium minima mollitia perspiciatis, quas, quo
        similique sunt voluptates. Ducimus eaque odio officia optio quibusdam
        reprehenderit, tenetur? Culpa cum delectus deserunt, fuga maiores
        soluta? Aliquam aliquid inventore laborum quasi tempore. At atque,
        cumque excepturi explicabo inventore ipsam, iste, magni nihil placeat
        quasi quis saepe voluptatem voluptatum. Alias autem blanditiis inventore
        itaque officia sunt? Adipisci aliquid assumenda delectus esse
        exercitationem harum libero minus officiis, quia repellendus tempore,
        totam, velit! Asperiores facere ipsam mollitia necessitatibus
        voluptates! Accusamus adipisci, debitis dignissimos distinctio dolores
        est eveniet excepturi explicabo laudantium libero maxime natus nihil,
        officia pariatur quasi quos rem reprehenderit repudiandae rerum velit.
        Accusantium asperiores aspernatur dolores magni nihil, non quos
        veritatis voluptate. Ab aspernatur consectetur deserunt labore nisi
        quidem rerum. Aperiam labore nam non perferendis quasi. A ab aliquam
        amet culpa cum dignissimos eligendi error esse eveniet, laborum
        laudantium magnam minima minus molestiae natus, nihil optio placeat qui
        quibusdam reiciendis repellendus similique tempora tenetur totam ullam
        velit voluptatum. Adipisci aliquid, animi architecto atque aut beatae
        consequatur cum debitis deserunt ea est et expedita illum impedit
        inventore iusto laboriosam magni minima natus nesciunt nihil obcaecati
        odit officia officiis placeat praesentium quaerat qui quisquam quod quos
        recusandae, reiciendis similique sint sunt tempore tenetur veritatis.
        Accusantium aliquid consequatur dicta dolorem doloremque et, expedita
        fuga fugit molestias perspiciatis possimus quas quidem soluta sunt
        suscipit ullam voluptas. Accusamus ad, atque aut cumque distinctio
        doloremque earum esse et fugiat incidunt nam nisi nobis quaerat ratione
        tenetur! Accusamus alias at consequatur cupiditate deserunt dolore earum
        eligendi et eum eveniet ex exercitationem ipsum itaque magnam minima
        minus molestias neque nesciunt nihil nostrum numquam obcaecati odio
        praesentium provident quasi qui quos rem repellat repudiandae, sapiente
        sequi similique tempora totam velit veritatis vero voluptates. Aliquid
        autem commodi cum cumque debitis dicta ducimus ea excepturi expedita
        ipsa iste iure labore laborum, libero nemo non obcaecati odio odit
        pariatur placeat provident quaerat quis, quod, ratione rem repellat
        reprehenderit similique totam veniam voluptatum? Alias delectus deleniti
        eos eum ex fuga fugit id itaque mollitia natus nisi non provident,
        quidem quisquam unde ut voluptatum! Accusamus corporis deserunt, dolore,
        ea enim excepturi exercitationem harum, in magnam magni maxime mollitia
        nihil nisi odit quos tempore tenetur voluptas. Ab aliquam architecto
        culpa id possimus praesentium, quos sint soluta ullam voluptatum! Alias
        aut, debitis facere, laudantium neque nihil nostrum officiis perferendis
        quam quas quis recusandae vitae. Architecto aspernatur atque aut beatae
        culpa cumque dicta dolor dolores ea earum exercitationem expedita
        explicabo, fugiat impedit laboriosam minima modi nobis odit quas quos
        repellat reprehenderit repudiandae saepe vitae voluptates. Et inventore
        laboriosam repudiandae. Corporis cupiditate distinctio et excepturi
        nesciunt nulla obcaecati omnis porro unde voluptatum! Deserunt
        distinctio eaque, eius eveniet, illo magni maiores minus neque, nesciunt
        nostrum odit pariatur perspiciatis quae quia reiciendis saepe tempore
        temporibus. Deleniti doloremque enim et facilis impedit maxime, modi
        natus nihil officiis perspiciatis, reiciendis, repellendus sed veniam.
        Accusamus assumenda dicta, eligendi explicabo fuga libero modi
        praesentium quam repudiandae tempora velit vitae! Architecto assumenda
        exercitationem ipsam reprehenderit sit. Aperiam laboriosam maxime quidem
        repudiandae! Assumenda cumque inventore labore maiores molestias
        mollitia, quasi sapiente sed. A accusamus accusantium adipisci animi
        aperiam atque aut consequuntur deserunt dicta dignissimos doloribus fuga
        ipsa iure iusto labore laudantium maiores minima minus nisi odio
        perferendis possimus quidem quis quisquam ratione recusandae reiciendis
        sunt temporibus vitae, voluptas! Ad beatae cumque fugiat id illo ipsum,
        labore neque praesentium quos recusandae soluta tempora veritatis!
        Adipisci at autem dolorem eveniet quam ratione similique tenetur totam
        ut? Ad aliquam, animi consequuntur corporis cum dolorem doloremque eius
        error expedita fuga fugiat hic illo laboriosam nobis quo reiciendis rem
        ullam? Adipisci assumenda commodi corporis, dolorem dolorum esse
        exercitationem ipsa, maiores nam perferendis suscipit tempora vitae
        voluptas. Accusantium at beatae doloribus eaque, est eveniet labore
        magnam necessitatibus vero!
      </p>
      <h1 className="text-center">IMPC Heatmap</h1>
      {loading ? (
        <div className="d-flex justify-content-center w-100">
          <Spinner className="spinner" animation="border" variant="dark" />
        </div>
      ) : (
        <>
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
                    isDisabled={
                      !!(selectedPhenotypes && selectedPhenotypes.length > 0) ||
                      geneRange > 0
                    }
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
                    isDisabled={
                      !!(selectedGenes && selectedGenes.length > 0) ||
                      geneRange > 0
                    }
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
                    disabled={
                      !!(selectedGenes && selectedGenes.length > 0) ||
                      !!(selectedPhenotypes && selectedPhenotypes.length > 0)
                    }
                    value={geneRange}
                    onChange={(e) => {
                      setGeneRange(Number(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
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

export default App;
