import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Range } from "react-range";
import FilterBarProducts from "./filterBarProducts";
import { RootState } from "../products/cart/contextCart/store/rootReducer";
import {
  setSearchTerm,
  setPriceRange,
  setSelectedColor,
  setSelectedMarca,
  setActiveFilter,
} from "../context/ProductsFilterContext/filterSlice";
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
  StickyFilterContainer,
} from "./sideBarStyle";

const CombinedFilterComponent: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const selectedColor = useSelector(
    (state: RootState) => state.filter.selectedColor
  );
  const selectedMarca = useSelector(
    (state: RootState) => state.filter.selectedMarca
  );
  const activeFilter = useSelector(
    (state: RootState) => state.filter.activeFilter
  );

  const handleRangeChange = (newRange: number[]) => {
    if (newRange.length === 2) {
      dispatch(setPriceRange(newRange as [number, number]));
    }
  };

  return (
    <StickyFilterContainer>
      <FilterSection>
        <SidebarTitle>Filtros</SidebarTitle>

        <FilterBarProducts
          searchTerm={searchTerm}
          onSearchChange={(newTerm) => dispatch(setSearchTerm(newTerm))}
          activeFilter={activeFilter}
          onFilterChange={(filter) => dispatch(setActiveFilter(filter))}
        />

        <div className="price-section">
          <label>Rango de Precio</label>
          <PriceRangeContainer>
            <PriceRangeBar>
              <Range
                step={10}
                min={0}
                max={1000}
                values={priceRange}
                onChange={handleRangeChange}
                renderTrack={({ props, children }) => (
                  <PriceRangeTrack {...props}>{children}</PriceRangeTrack>
                )}
                renderThumb={({ props }) => (
                  <div {...props} style={{ ...props.style, ...thumbStyles }} />
                )}
              />
            </PriceRangeBar>
            <PriceRangeInputs>
              <PriceRangeInput
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  dispatch(setPriceRange([+e.target.value, priceRange[1]]))
                }
              />
              <PriceRangeInput
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  dispatch(setPriceRange([priceRange[0], +e.target.value]))
                }
              />
            </PriceRangeInputs>
          </PriceRangeContainer>
        </div>

        <div className="color-section">
          <label>Color</label>
          <FilterSelect
            value={selectedColor || ""}
            onChange={(e) => dispatch(setSelectedColor(e.target.value))}
          >
            <option value="">Selecciona un color</option>
            <option value="Rojo">Rojo</option>
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
          </FilterSelect>
        </div>

        <div className="brand-section">
          <label>Marca</label>
          <FilterSelect
            value={selectedMarca || ""}
            onChange={(e) => dispatch(setSelectedMarca(e.target.value))}
          >
            <option value="">Selecciona una marca</option>
            <option value="Marca1">Marca1</option>
            <option value="Marca2">Marca2</option>
            <option value="Marca3">Marca3</option>
          </FilterSelect>
        </div>
      </FilterSection>
    </StickyFilterContainer>
  );
};

export default CombinedFilterComponent;
