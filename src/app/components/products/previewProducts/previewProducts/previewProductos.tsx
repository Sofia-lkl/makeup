import React from "react";
import Slider from "react-slick";
import Link from "next/link"; // Importa el componente Link

import {
  PreviewContainer,
  ProductSlide,
  ViewAllButton,
  ProductDetailsContainer,
} from "../preview-flow-productStyles/previewProductsStyle";
import ProductFlow from "../productFlow/productFlow";
import { Product } from "../../../admin/productAction-reducer-types/types/types";

const slideVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

type ProductPreviewProps = {
  onProductClick: () => void;
  productList: Product[];
  isModalOpen: boolean;
};

const ProductPreview: React.FC<ProductPreviewProps> = ({
  onProductClick,
  productList,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const imageBackgrounds = [
    "/img/44.jpg",
    "/img/3.jpg",
    "/img/6.jpg",
    "/img/2.jpg",
  ];

  return (
    <PreviewContainer>
      <Slider {...settings}>
        {imageBackgrounds.map((imageUrl, index) => (
          <ProductSlide key={index} $imageUrl={imageUrl} />
        ))}
      </Slider>

      <ProductFlow products={productList} />

      <Link href="/todosLosProductos">
        <ViewAllButton variant="contained" size="large">
          Ver todos los productos
        </ViewAllButton>
      </Link>
    </PreviewContainer>
  );
};

export default ProductPreview;
