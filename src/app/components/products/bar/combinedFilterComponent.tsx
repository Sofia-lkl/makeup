import React from "react";
import { Range } from "react-range";
import FilterBarProducts from "./filterBarProducts";
import { useFilter } from "../context/ProductsFilterContext/ProductsFilterContext";

import {
  thumbStyles,
  FilterSelect,
  FilterSection,
  SidebarTitle,
  PriceRangeBar,
  PriceRangeInput,
  PriceRangeInputs,
  PriceRangeContainer,
  PriceRangeTrack,
} from "./sideBarStyle";

const CombinedFilterComponent: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    selectedColor,
    setSelectedColor,
    selectedMarca,
    setSelectedMarca,
    activeFilter,
    setActiveFilter,
  } = useFilter();

  const handleRangeChange = (newRange: number[]) => {
    if (newRange.length === 2) {
      setPriceRange(newRange as [number, number]);
    }
  };

  return (
    <div>
      <SidebarTitle>Filtros</SidebarTitle>

      <FilterBarProducts
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <FilterSection>
        <label>Rango de Precio</label>
        <PriceRangeContainer>
          <PriceRangeBar>
            <Range
              step={10}
              min={0}
              max={1000}
              values={priceRange}
              onChange={handleRangeChange}
              renderTrack={({ props, children }) => {
                const {  ...restProps } = props;
                return (
                  <PriceRangeTrack key="range" {...restProps}>
                    {children}
                  </PriceRangeTrack>
                );
              }}
              renderThumb={({ props }) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    style={{ ...restProps.style, ...thumbStyles }}
                  />
                );
              }}
            />
          </PriceRangeBar>
          <PriceRangeInputs>
            <PriceRangeInput
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            />
            <PriceRangeInput
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            />
          </PriceRangeInputs>
        </PriceRangeContainer>
      </FilterSection>

      <FilterSection>
        <label>Color</label>
        <FilterSelect
          value={selectedColor || ""}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">Selecciona un color</option>
          <option value="Rojo">Rojo</option>
          <option value="Azul">Azul</option>
          <option value="Verde">Verde</option>
        </FilterSelect>
      </FilterSection>

      <FilterSection>
        <label>Marca</label>
        <FilterSelect
          value={selectedMarca || ""}
          onChange={(e) => setSelectedMarca(e.target.value)}
        >
          <option value="">Selecciona una marca</option>
          <option value="Marca1">Marca1</option>
          <option value="Marca2">Marca2</option>
          <option value="Marca3">Marca3</option>
        </FilterSelect>
      </FilterSection>
    </div>
  );
};

export default CombinedFilterComponent;
