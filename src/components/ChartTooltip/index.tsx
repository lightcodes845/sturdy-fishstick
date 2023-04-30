import React from 'react';
import classes from "./index.module.scss";

type Props = {
    serieId: string;
    x: number;
    y: number;
    data: {
        x: string;
        y: number;
        marker_accession_id: string;
        procedures: string[]
        phenotype_terms: {"mp_term_id": string, "mp_term_name": string}[]
    }
}

const ChartTooltip: React.FC<Props> = ({serieId, data, x, y}) => {
    console.log("x: ", x);
    console.log("y: ", y);
    return (
        // <TooltipWrapper anchor="center" position={[0, 0]}>
        <div className={`${classes.tooltip} card`}>
            <div className="card-body">
                <h5 className="card-title">{`${serieId}(${
                    data.marker_accession_id ? data.marker_accession_id : "No ID"
                })`}</h5>
                <hr />
                <h6 className="card-subtitle">
                    {"Top level phenotype"}
                </h6>
                <p className="card-text">{data.x}</p>
                <hr />
                <h6 className="card-subtitle">
                    {"Phenotype association count"}: {data.y === 0 ? "No Association": data.y}
                </h6>
                {/*<p className="card-text">{data.y === 0 ? "No Association": data.y}</p>*/}
                <hr />
                <h6 className="card-subtitle">
                    {/*{`First ${data.procedures.length > 6 ? 6 : data.procedures.length} procedures`}*/}
                    {"Procedures"}
                </h6>
                {data.procedures.length > 0 ? (
                    <ul className="list-group">
                        {data.procedures.slice(0.6).map((procedure, index) => {
                            return <li key={index}>{procedure}</li>;
                        })}
                    </ul>
                ) : (
                    <p className="card-text">No procedures</p>
                )}
                <hr />
                <h6 className="card-subtitle">
                    {/*{`First ${data.phenotype_terms.length > 6 ? 6 : data.phenotype_terms.length} phenotype terms`}*/}
                    {"Phenotype terms"}
                </h6>
                {data.phenotype_terms.length > 0 ? (
                    <ul className="list-group">
                        {data.phenotype_terms.slice(0,6).map((term, index) => {
                            return <li key={index}>{term.mp_term_name} ({term.mp_term_id})</li>;
                        })}
                    </ul>
                ) : (
                    <p className="card-text">No other terms</p>
                )}
            </div>
        </div>
        // </TooltipWrapper>
    );
};

export default ChartTooltip;