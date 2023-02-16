import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import openNotificationWithIcon from "../../components/animations";
import { getProduct } from "../../services/product.services";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const docPros = await getProduct(id);
        setProduct(docPros.data());
      } catch (err) {
        openNotificationWithIcon("warning", err.message);
      }
    };
    id && getProductDetail();
  }, [id]);
  return (
    <div className="product-detail">
      <h1 className="title-page">Products Detail</h1>
      <div name="detail-info" className="flex">
        <img className="img-detail" src={product?.url} alt={product?.name} />
        <div className="info-detail">
          <div className="info-detail-item">
            <span className="item-name">{product?.name}</span>
          </div>
          <div className="info-detail-item">
            <span className="item-price">
              {product?.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="info-detail-item">
            <h2 className="label-detail">Type : </h2>
            <span className="item-type">{product?.type}</span>
          </div>
          <div className="info-detail-item">
            <h2 className="label-detail">Number : </h2>
            <span className="item-num">{product?.num}</span>
          </div>
          <div className="des-detail">
            <h2 className="label-detail">Descriptions : </h2>
            <span className="item-des">{product?.des}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
