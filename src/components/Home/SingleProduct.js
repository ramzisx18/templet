import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToProduct, specificItem } from "../../redux/features/productSlice";
import { useLanguage } from "../../context/LanguageContext";

const SingleProduct = ({ product }) => {
   const { t } = useLanguage();
   const { id, img, category, price, title } = product;
   const dispatch = useDispatch();

   const handleDetailsProduct = () => {
      dispatch(specificItem(id));
   };

   return (
      <>
         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
            <div className="product__item white-bg mb-30 wow fadeInUp" data-wow-delay=".3s">
               <div className="product__thumb">
                  <div onClick={handleDetailsProduct} className="product__thumb-inner fix w-img">
                     <Link href="/product-details">
                        <a>
                           <img src={img} alt="" />
                        </a>
                     </Link>
                  </div>
                  <div className="product__thumb-btn transition-3">
                     <a>
                        <button
                           onClick={() => dispatch(addToProduct(product))}
                           className="m-btn m-btn-6 mb-15"
                        >
                           {t('products.addToCart')}
                        </button>
                     </a>
                     <a
                        href="#"
                        rel="noreferrer"
                        target="_blank"
                        className="m-btn m-btn-7"
                     >
                        {t('products.previewProject')}
                     </a>
                  </div>
               </div>
               <div className="product__content">
                  <div className="product__meta mb-10 d-flex justify-content-between align-items-center">
                     <div className="product__tag">
                        <a href="#">{category}</a>
                     </div>
                     <div className="product__price">
                        <span>${price}</span>
                     </div>
                  </div>
                  <h3 onClick={handleDetailsProduct} className="product__title">
                     <Link href="/product-details">
                        <a>{title}</a>
                     </Link>
                  </h3>
               </div>
            </div>
         </div>
      </>
   );
};

export default SingleProduct;
