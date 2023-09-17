
import Slider from "react-slick";
import {
  colors,
  PreviewContainer,
  ProductSlide,
  ViewAllButton,
  ProductDetailsContainer,
} from "./previewProductsStyle";
import ProductFlow from "./productFlow";
import { Product } from "../../admin/productContext/types";

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
    '/img/44.jpg',
    '/img/3.jpg',
    '/img/6.jpg',
    '/img/2.jpg',]
  return (
    <PreviewContainer>
      <Slider {...settings}>
        {imageBackgrounds.map((imageUrl, index) => (
          <ProductSlide
            key={index}
            imageUrl={imageUrl}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          />
        ))}
      </Slider>

      <ProductFlow products={productList} /> 

      <ViewAllButton variant="contained" size="large" onClick={onProductClick}>
        Ver todos los productos
      </ViewAllButton>
    </PreviewContainer>
  );
};

export default ProductPreview;
