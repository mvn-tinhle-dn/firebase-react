import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import openNotificationWithIcon from "../../components/animations";
import FormProd from "../../components/modules/FromProd";
import { addProduct } from "../../services/product.services";
import { metadata, stg } from "../../firebase/firebase-config";

export default function AddProduct() {
  const navigate = useNavigate();
  const [fileUpload, setFileUpload] = useState(null);
  const stgRef = ref(stg, `images/${fileUpload?.name}`);

  const onFinish = async (values) => {
    await uploadBytes(stgRef, fileUpload.originFileObj, metadata).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downURL) => {
          const arrPros = {
            ...values,
            des: values.des ? values.des : "",
            url: downURL,
          };
          try {
            await addProduct(arrPros);
            openNotificationWithIcon("success", "Add Product");
            navigate("/products");
          } catch (err) {
            openNotificationWithIcon("warning", err.message);
          }
        });
      }
    );
  };

  return (
    <div className="add-product">
      <h1 className="title-page">Add Product</h1>
      <FormProd
        onFinish={onFinish}
        required={true}
        nameForm="Add Product"
        setFileUpload={setFileUpload}
      />
    </div>
  );
}
