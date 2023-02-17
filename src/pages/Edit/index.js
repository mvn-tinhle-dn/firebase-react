import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import openNotificationWithIcon from "../../components/animations";
import FormProd from "../../components/modules/FromProd/index";
import { metadata, stg } from "../../firebase/firebase-config";
import { getProduct, updateProduct } from "../../services/product.services";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const stgRef = ref(stg, `images/${fileUpload?.name}`);

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

  async function onFinish(values) {
    try {
      fileUpload
        ? await uploadBytes(stgRef, fileUpload.originFileObj, metadata).then(
            (snapshot) => {
              getDownloadURL(snapshot.ref).then(async (downURL) => {
                await updateProduct(id, { ...values, url: downURL });
              });
            }
          )
        : await updateProduct(id, { ...values, url: product.url });
      openNotificationWithIcon("success", "Update Product");
    } catch (error) {
      openNotificationWithIcon("warning", error.message);
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
        setFileUpload={setFileUpload}
      />
    </div>
  );
}
