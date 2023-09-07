
import Slider from "react-slick";
import {
  colors,
  PreviewContainer,
  ProductSlide,
  ViewAllButton,
  ProductDetailsContainer,
} from "./previewProductsStyle";

const slideVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

type Product = {
  imagen_url: string;
  nombre: string;
  precio: number;
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

  return (
    <PreviewContainer>
      <Slider {...settings}>
        {productList.map((product, index) => (
          <ProductSlide
            key={index}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          >
            <img src={product.imagen_url} alt={product.nombre} />
          </ProductSlide>
        ))}
      </Slider>
      <ViewAllButton variant="contained" size="large" onClick={onProductClick}>
        Ver todos los productos
      </ViewAllButton>
    </PreviewContainer>
  );
};

export default ProductPreview;
