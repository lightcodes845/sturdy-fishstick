import {PlotData, RangeData, SelectData} from "../dataTypes";

export const ActionTypes = {
  FETCH_FULL_DATA_START: "FETCH_FULL_DATA_START",
  FETCH_FULL_DATA_SUCCESS: "FETCH_FULL_DATA_SUCCESS",
  FETCH_FULL_DATA_FAILURE: "FETCH_FULL_DATA_FAILURE"
}

type FullDataState = {
  loading: boolean;
  fullData: PlotData[];
  error: string | null;
  genes: SelectData[];
  phenotypes: SelectData[];
  geneTotalPhenotypeCount: RangeData[];
};

type FullDataAction =  {
  type: string;
  payload?: {
    error?: string,
    data?: PlotData[]
    genes?: SelectData[];
    phenotypes?: SelectData[];
    geneTotalPhenotypeCount?: RangeData[];
  }
};

export const INITIAL_STATE: FullDataState = {
  loading: false,
  fullData: [],
    genes: [],
    phenotypes: [],
  geneTotalPhenotypeCount: [],
  error: null,
};

const fullDataReducer = (state = INITIAL_STATE, action: FullDataAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_FULL_DATA_START:
      return {
        ...state,
        error: null,
        fullData: [],
        genes: [],
        phenotypes: [],
        loading: true,
      };
    case ActionTypes.FETCH_FULL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        fullData: action.payload!.data!,
        genes: action.payload!.genes!,
        phenotypes: action.payload!.phenotypes!,
        geneTotalPhenotypeCount: action.payload!.geneTotalPhenotypeCount!,
      };
    case ActionTypes.FETCH_FULL_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload!.error!,
      };
    default:
      return state;
  }
};

export default fullDataReducer;
