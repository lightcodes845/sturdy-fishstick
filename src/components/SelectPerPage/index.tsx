import React from "react";

type Props = {
  id: string;
  value: number;
  paginate: (pageNumber: number) => void;
  setElementsPerPage: (elementsPerPage: number) => void;
};

const SelectPerPage: React.FC<Props> = ({
  id,
  setElementsPerPage,
  paginate,
  value,
}) => {
  return (
    <div className="me-3">
      <label htmlFor={id}>Showing&nbsp;&nbsp;</label>
      <select
        name={id}
        id={id}
        value={value}
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
  );
};

export default SelectPerPage;