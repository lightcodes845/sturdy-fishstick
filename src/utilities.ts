import { Data, PlotData } from "./dataTypes";

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const convertToPlotFormat = (data: Data[]) => {
  let result: {
    [key: string]: {
      x: string; // top_level_mp_term_name
      y: number; // phenotype_count
      marker_accession_id: string;
      top_level_mp_term_id: string;
      procedures: string[];
      phenotype_terms: { mp_term_id: string; mp_term_name: string }[];
    }[];
  } = {};

  // create a set of top level phenotype terms
  const phenotypeTerms = new Set<string>();
  const phenotypeTermsIds = new Set<string>();
  // create a map of marker_symbol to phenotype terms
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    // add phenotype term to set
    phenotypeTerms.add(item.top_level_phenotype_term.top_level_mp_term_name);
    if (phenotypeTerms.size > phenotypeTermsIds.size) {
      phenotypeTermsIds.add(item.top_level_phenotype_term.top_level_mp_term_id);
    }

    // get the marker_symbol
    const element = result[item.marker_symbol];
    // if marker_symbol exists in array, push the phenotype term else create a new entry
    if (element) {
      element.push({
        x: item.top_level_phenotype_term.top_level_mp_term_name,
        y: item.phenotype_count,
        top_level_mp_term_id: item.top_level_phenotype_term.top_level_mp_term_id,
        marker_accession_id: item.marker_accession_id,
        procedures: item.procedures,
        phenotype_terms: item.phenotype_terms,
      });
    } else {
      result[item.marker_symbol] = [
        {
          x: item.top_level_phenotype_term.top_level_mp_term_name,
          y: item.phenotype_count,
          marker_accession_id: item.marker_accession_id,
          top_level_mp_term_id: item.top_level_phenotype_term.top_level_mp_term_id,
          procedures: item.procedures,
          phenotype_terms: item.phenotype_terms,
        },
      ];
    }
  }

  let plotData: PlotData[] = [];
  // convert the phenotype set to an array of objects
  const pt = Array.from(phenotypeTerms);
  const ptIds = Array.from(phenotypeTermsIds);
  const genes = []
  const forRangeFilter = [];
  // for each marker_symbol, add the missing top level phenotype terms and set the count to 0
  for (const marker_symbol in result) {
    const res = result[marker_symbol];
    for (let i = 0; i < pt.length; i++) {
      const element = res.find((d) => d.x === pt[i]);
      if (!element) {
        res.push({
          x: pt[i],
          y: -10, // set the count to -10 for missing phenotype and for it to be distinguishable to 1 phenotype count in the heatmap
          top_level_mp_term_id: ptIds[i],
          marker_accession_id: res[0].marker_accession_id,
          procedures: [],
          phenotype_terms: [],
        });
      }
    }

    // add the marker_symbol to the genes array for genes select component
    genes.push({
      value: marker_symbol,
      label: marker_symbol,
    })
    // convert the objects to the format required by the heatmap
    plotData.push({
      id: marker_symbol,
      data: res,
    });

    //create list of marker_symbols and their total phenotype count for range filter
    forRangeFilter.push({
      id: marker_symbol,
      value: res.map((d) => d.y).reduce((a, b) => {
        if(a === -10) a = 0;
        if(b === -10) b = 0;
        return a + b;
      }, 0),
    })
    //sort the list in descending order
    forRangeFilter.sort((a, b) => b.value - a.value);
  }

  //convert phenotype terms into format required by phenotype select component
  const pt2 = pt.map((d) => {
    return {
      value: d,
      label: capitalizeFirstLetter(d),
    };
  });

  return {
    plotData,
    phenotypeTerms: pt2,
    genes,
    forRangeFilter,
  };
};