import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import openNotificationWithIcon from "../../components/animations";
import FormProd from "../../components/modules/FromProd/index";
import { getProduct, updateProduct } from "../../services/product.services";

export default function EditProduct() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [product, setProduct] = useState();
  const arrEdit = product;

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

  async function onFinish(values, url) {
    if (values.name === "" || values.price === "" || values.num === null) {
      openNotificationWithIcon("warning", " Miss Prams");
    } else {
      arrEdit.name = values.name;
      arrEdit.type = values.type;
      arrEdit.price = values.price;
      arrEdit.num = values.num;
      arrEdit.des = values.des;
      url === "" ? (arrEdit.url = product.url) : (arrEdit.url = url);
      try {
        await updateProduct(id, arrEdit);
        openNotificationWithIcon("success", "Update Product");
      } catch (error) {
        openNotificationWithIcon("warning", error.message);
      }
      navigate("/products");
    }
  }

  return (
    <div className="edit">
      <h1 className="title-page">Edit</h1>
      <FormProd
        onFinish={onFinish}
        currItem={product}
        required={false}
        nameForm="Edit Product"
      />
    </div>
  );
}
