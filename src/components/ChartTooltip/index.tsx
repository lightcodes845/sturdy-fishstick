import React from "react";
import classes from "./index.module.scss";

type Props = {
  serieId: string;
  data: {
    x: string;
    y: number;
    marker_accession_id: string;
    top_level_mp_term_id: string,
    procedures: string[];
    phenotype_terms: { mp_term_id: string; mp_term_name: string }[];
  };
};

const ChartTooltip: React.FC<Props> = ({ serieId, data }) => {
  return (
    <div className={`${classes.tooltip} card`}>
      <div className="card-body">
        <h5 className="card-title">{`${serieId}(${
          data.marker_accession_id ? data.marker_accession_id : "No ID"
        })`}</h5>
        <hr />
        <h6 className="card-subtitle">{"Top level phenotype"}</h6>
        <p className="card-text">{`${data.x} (${data.top_level_mp_term_id})`}</p>
        <hr />
        <h6 className="card-subtitle">
          {"Phenotype association count"}:{" "}
          {data.y === -10 ? "No Association" : data.y}
        </h6>
        {/*<p className="card-text">{data.y === 0 ? "No Association": data.y}</p>*/}
        <hr />
        <h6 className="card-subtitle">
          {"Procedures"}
        </h6>
        {data.procedures.length > 0 ? (
          <ul className="list-group">
            {data.procedures.slice(0.4).map((procedure, index) => {
              return <li key={index}>{procedure}</li>;
            })}
          </ul>
        ) : (
          <p className="card-text">No procedures</p>
        )}
        <hr />
        <h6 className="card-subtitle">
          {"Phenotype terms"}
        </h6>
        {data.phenotype_terms.length > 0 ? (
          <ul className="list-group">
            {data.phenotype_terms.slice(0, 4).map((term, index) => {
              return (
                <li key={index}>
                  {term.mp_term_name} ({term.mp_term_id})
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="card-text">No other terms</p>
        )}
        {data.procedures.length > 4 || data.phenotype_terms.length > 4 ? (
          <>
            <hr />
            <span className="card-text">
              This result data is truncated, please use '
              <span style={{ color: "#ed7b25" }}>Search</span>' link on the
              navbar to view all details about this gene.
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ChartTooltip;