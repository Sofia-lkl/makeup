import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegSmile, FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/rootReducer";
import {
  setSearchTerm,
  setPriceRange,
  setSelectedColor,
  setSelectedMarca,
  setSelectedCategory,
} from "../../../../redux/ProductsFilterSlice/filterSlice";
import {
  FilterSection,
  SidebarTitle,
  StickyFilterContainer,
  FilterSectionItem,
} from "../sideBarStyles/sideBarStyle";
import {
  PriceRangeInputs,
  PriceRangeContainer,
} from "../sideBarStyles/priceRangeStyles";
import { FilterInput, PriceRangeInput } from "../sideBarStyles/inputStyles";
import { FilterButtons } from "../sideBarStyles/buttonStyles";
import Slider from "@mui/material/Slider";
import Select, { StylesConfig } from "react-select";

const CombinedFilterComponent: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  );

  const selectedColor = useSelector(
    (state: RootState) => state.filter.selectedColor
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  const selectedMarca = useSelector(
    (state: RootState) => state.filter.selectedMarca
  );
  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      minWidth: "200px",
      borderRadius: '30px', // Más redondeado
    }),
    menu: (provided) => ({
      ...provided,
      minWidth: "200px",
      zIndex: 1000,
      borderRadius: '20px', // Más redondeado
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (provided) => ({
      ...provided,
      borderRadius: '20px', // Más redondeado
    }),
};
  useEffect(() => {
    setMenuPortalTarget(document.getElementById("menu-portal"));
  }, []);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const colorOptions = [
    { value: "", label: "Selecciona un color" },
    { value: "Rojo", label: "Rojo" },
    { value: "Azul", label: "Azul" },
    { value: "Verde", label: "Verde" },
  ];

  const marcaOptions = [
    { value: "", label: "Selecciona una marca" },
    { value: "Marca1", label: "Marca1" },
    { value: "Marca2", label: "Marca2" },
    { value: "Marca3", label: "Marca3" },
  ];
  interface OptionType {
    value: string;
    label: string;
  }
  interface MyRange {
    min: number;
    max: number;
  }

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      const newRange: MyRange = { min: value[0], max: value[1] };
      dispatch(setPriceRange([newRange.min, newRange.max]));
    }
  };

  const handleFilterClick = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    dispatch(setSearchTerm(newSearchTerm));
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!hasScrolled && currentScrollY > 0) {
        setHasScrolled(true);
      }

      if (currentScrollY === 0) {
        setIsExpanded(true);
      } else if (hasScrolled && currentScrollY > lastScrollY) {
        setIsExpanded(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, hasScrolled]);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (window.scrollY !== 0) {
        setIsExpanded(false);
      }
    }, 300);
  };
  return (
    <StickyFilterContainer
      className={isExpanded ? "expanded" : "collapsed"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarTitle>Filtros</SidebarTitle>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ position: "relative", width: "40%" }}>
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
            className={selectedCategory === "Todos" ? "active" : ""}
            onClick={() => handleFilterClick("Todos")}
          >
            Todos los productos
          </button>

          <button
            className={selectedCategory === "Ojos" ? "active" : ""}
            onClick={() => handleFilterClick("Ojos")}
          >
            <FaRegEye size={24} style={{ marginRight: "0px" }} />
            Productos para ojos
          </button>

          <button
            className={selectedCategory === "Rostro" ? "active" : ""}
            onClick={() => handleFilterClick("Rostro")}
          >
            <FaRegSmile size={24} style={{ marginRight: "0px" }} />
            Productos para rostro
          </button>
        </FilterButtons>
      </div>
      <FilterSection>
        <div className="price-section">
          <label>Rango de Precio</label>
          <PriceRangeContainer>
            <Slider
              value={priceRange}
              onChange={(event, newValue) => handleSliderChange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              track="inverted"
            />

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

        <FilterSectionItem className="color-section">
          <label>Color</label>
          <Select
            styles={customStyles}
            options={colorOptions}
            value={colorOptions.find(
              (option) => option.value === selectedColor
            )}
            onChange={(newValue) => {
              const option = newValue as OptionType | null;
              dispatch(setSelectedColor(option?.value || ""));
            }}
            menuPortalTarget={menuPortalTarget}
            placeholder="Selecciona un color" // Añade esta línea
          />
        </FilterSectionItem>

        <FilterSectionItem className="brand-section">
          <label>Marca</label>
          <Select
            styles={customStyles}
            options={marcaOptions}
            value={marcaOptions.find(
              (option) => option.value === selectedMarca
            )}
            onChange={(newValue) => {
              const option = newValue as OptionType | null;
              dispatch(setSelectedMarca(option?.value || ""));
            }}
            menuPortalTarget={menuPortalTarget}
            placeholder="Selecciona una marca" // Añade esta línea
          />
        </FilterSectionItem>
      </FilterSection>
    </StickyFilterContainer>
  );
};

export default CombinedFilterComponent;
