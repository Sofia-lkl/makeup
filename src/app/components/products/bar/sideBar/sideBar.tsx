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
  HamburgerButton,
} from "../sideBarStyles/sideBarStyle";
import {
  PriceRangeInputs,
  PriceRangeContainer,
} from "../sideBarStyles/priceRangeStyles";
import { FilterInput, PriceRangeInput } from "../sideBarStyles/inputStyles";
import { FilterButtons } from "../sideBarStyles/buttonStyles";
import Slider from "@mui/material/Slider";
import Select, { StylesConfig } from "react-select";
import { FaBars } from "react-icons/fa";
import { makeStyles } from "@mui/styles";
import {
  thumbColor,
  thumbColorHover,
  secondaryColor,
  primaryColor,
} from "../sideBarStyles/colors";

const useStyles = makeStyles({
  sliderVertical: {
    width: "200px",
    "& .MuiSlider-thumb": {
      color: thumbColor, // Color de los pulgares
      "&:hover": {
        backgroundColor: thumbColorHover,
      },
    },
    "& .MuiSlider-rail": {
      color: secondaryColor, // Color de la barra no activa
    },
    "& .MuiSlider-track": {
      color: primaryColor, // Color de la barra activa
    },
  },
  sliderHorizontal: {
    width: "100%",
    "& .MuiSlider-thumb": {
      color: thumbColor,
      "&:hover": {
        backgroundColor: thumbColorHover,
      },
    },
    "& .MuiSlider-rail": {
      color: secondaryColor,
    },
    "& .MuiSlider-track": {
      color: primaryColor,
    },
  },
});
const CombinedFilterComponent: React.FC = () => {
  const classes = useStyles();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
      borderRadius: "30px", // Más redondeado
    }),
    menu: (provided) => ({
      ...provided,
      minWidth: "200px",
      zIndex: 1000,
      borderRadius: "20px", // Más redondeado
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (provided) => ({
      ...provided,
      borderRadius: "20px",
    }),
  };

  useEffect(() => {
    setMenuPortalTarget(document.getElementById("menu-portal"));
  }, []);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
  useEffect(() => {
    // Esta función se ejecuta sólo en el cliente y no en el SSR
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleDropdownClick = (category: string) => {
    if (activeDropdown === category) {
      setActiveDropdown(null); // Cerrar el botón si ya está abierto
    } else {
      setActiveDropdown(category); // Abrir el botón si está cerrado
    }
  };
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFilterOpen]);
  return (
    <>
      {isMobile && (
        <HamburgerButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
          {isFilterOpen ? "Cerrar Filtros" : "Mostrar Filtros"}
        </HamburgerButton>
      )}
      <StickyFilterContainer
        className={`${isExpanded ? "expanded" : "collapsed"} ${
          isFilterOpen ? "open" : "closed"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarTitle>Filtros</SidebarTitle>

        {/* Mueve el buscador al principio */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
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
          {isMobile ? (
            <>
              <button onClick={toggleSubMenu}>Categorías</button>
              {isSubMenuOpen && (
                <div className="submenu">
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
                </div>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </FilterButtons>

        <FilterSection>
          {/* Condición para mostrar la sección de precio en móviles */}
          {isMobile && (
            <div className="price-section">
              <label>Rango de Precio</label>
              <PriceRangeContainer>
                <Slider
                  orientation="horizontal"
                  className={classes.sliderHorizontal}
                  value={priceRange}
                  onChange={(event, newValue) => handleSliderChange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
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
          )}

          <FilterSectionItem className="color-section">
            <label>Color</label>
            {isMounted && (
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
                placeholder="Selecciona un color"
              />
            )}
          </FilterSectionItem>

          <FilterSectionItem className="brand-section">
            <label>Marca</label>
            {isMounted && (
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
                placeholder="Selecciona una marca"
              />
            )}
          </FilterSectionItem>

          {/* Sección de precio para vistas de escritorio */}
          {!isMobile && (
            <div className="price-section">
              <label>Rango de Precio</label>
              <PriceRangeContainer>
                <Slider
                  orientation="horizontal"
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
          )}
        </FilterSection>
      </StickyFilterContainer>
    </>
  );
};

export default CombinedFilterComponent;
