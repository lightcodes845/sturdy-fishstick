export type Data = {
    marker_accession_id: string,
    marker_symbol: string,
    top_level_phenotype_term: {
        top_level_mp_term_id: string,
        top_level_mp_term_name: string
    },
    "procedures": string[],
    "phenotype_terms": {"mp_term_id": string, "mp_term_name": string}[],
    phenotype_count: number
}

export type PlotData = {
    id: string,
    data: {
        x: string,
        y: number,
        marker_accession_id: string,
        procedures: string[];
        phenotype_terms: { mp_term_id: string; mp_term_name: string }[];
    }[]
}

export type SelectData = {
    value: string;
    label: string;
};

export type RangeData = {
    id: string;
    value: number;
}