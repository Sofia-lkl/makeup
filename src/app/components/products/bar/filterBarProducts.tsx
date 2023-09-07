
import React from "react";
import { AiOutlineSearch, AiFillStar } from "react-icons/ai";
import { FaRegSmile, FaRegEye } from "react-icons/fa";
import { useFilter } from "../context/ProductsFilterContext/ProductsFilterContext"; 
import { StyledFilterBar, FilterInput, FilterButtons } from "./sideBarStyle";

// Definir las props que FilterBarProducts espera recibir
interface FilterBarProductsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeFilter: string | undefined;
  onFilterChange: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const FilterBarProducts: React.FC<FilterBarProductsProps> = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}) => {
  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
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
          value={searchTerm}
          onChange={onSearchChange}
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
