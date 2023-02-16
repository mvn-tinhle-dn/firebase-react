import React from "react";
import { useNavigate } from "react-router-dom";
import openNotificationWithIcon from "../../components/animations";
import FormProd from "../../components/modules/FromProd";
import { addProduct } from "../../services/product.services";

export default function AddProduct() {
  const navigate = useNavigate();
  //add
  const onFinish = async (values, url) => {
    const arrPros = { ...values, url };
    console.log(arrPros);
    try {
      await addProduct(arrPros);
      openNotificationWithIcon("success", "Add Product");
      navigate("/products");
    } catch (err) {
      openNotificationWithIcon("warning", err.message);
    }
  };

  return (
    <div className="add-product">
      <h1 className="title-page">Add Product</h1>
      <FormProd onFinish={onFinish} required={true} nameForm="Add Product" />
    </div>
  );
}
