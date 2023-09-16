import React, { useState } from "react";
import { AiOutlineSearch, AiFillStar } from "react-icons/ai";
import { FaRegSmile, FaRegEye } from "react-icons/fa";
import { StyledFilterBar, FilterInput, FilterButtons } from "./sideBarStyle";

interface FilterBarProductsProps {
  searchTerm: string;
  onSearchChange: (newTerm: string) => void; // Función para informar al componente padre sobre cambios
  activeFilter: string | undefined;
  onFilterChange: (value: string | undefined) => void;
}

const FilterBarProducts: React.FC<FilterBarProductsProps> = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  return (
    <StyledFilterBar>
      <div style={{ position: "relative", width: "80%" }}>
        <AiOutlineSearch
          size={24}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "grey",
          }}
        />
        <FilterInput
          style={{ paddingLeft: "40px" }}
          value={localSearchTerm}
          onChange={handleSearchInputChange}
          placeholder="Buscar productos..."
        />
      </div>
      <FilterButtons>
        <button
          className={activeFilter === "Todos" ? "active" : ""}
          onClick={() => handleFilterClick("Todos")}
        >
          <AiFillStar style={{ marginRight: "0px" }} />
          Todos
        </button>
        <button
          className={activeFilter === "Categoria1" ? "active" : ""}
          onClick={() => handleFilterClick("Categoria1")}
        >
          <FaRegEye size={24} style={{ marginRight: "0px" }} />
          Productos para ojos
        </button>
        <button
          className={activeFilter === "Categoria2" ? "active" : ""}
          onClick={() => handleFilterClick("Categoria2")}
        >
          <FaRegSmile size={24} style={{ marginRight: "0px" }} />
          Productos para rostro
        </button>
      </FilterButtons>
    </StyledFilterBar>
  );
};

export default FilterBarProducts;
