import React, { createContext, useEffect, useReducer } from "react";
import { Data, PlotData, RangeData, SelectData } from "../dataTypes";
import fullDataReducer, {
  ActionTypes,
  INITIAL_STATE,
} from "../reducers/fullDataReducer";
import { localforage } from "../storage";
import { convertToPlotFormat } from "../utilities";

export type DataContextType = {
  loading: boolean;
  fullData: PlotData[];
  error: string | null;
  genes: SelectData[];
  phenotypes: SelectData[];
  rangeFilterData: RangeData[];
};

type Props = {
  children: React.ReactNode;
};

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider: React.FC<Props> = ({ children }) => {
  const [
    { fullData, loading, genes, phenotypes, rangeFilterData, error },
    dispatch,
  ] = useReducer(fullDataReducer, INITIAL_STATE);

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
        } catch (e: any) {
          dispatch({
            type: ActionTypes.FETCH_FULL_DATA_FAILURE,
            payload: { error: e.message },
          });
        }
      }
    };
    fetchData();
  }, []);

  const value = {
    fullData, loading, genes, phenotypes, rangeFilterData, error
  };

  return <DataContext.Provider value={value}> {children} </DataContext.Provider>;
};

export default DataContextProvider;