import { Layout, Spin } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollTop from "../../components/modules/ScrollTop/ScrollTop.js";
import EditProduct from "../Edit/index.js";
import ProductDetail from "../ProductDetail/index.js";

const FooterCP = React.lazy(() =>
  import("../../components/layouts/Footer/index.js")
);
const HeaderCP = React.lazy(() =>
  import("../../components/layouts/Header/index.js")
);
const SiteBarCP = React.lazy(() =>
  import("../../components/layouts/SiteBar/index.js")
);
const ProductsList = React.lazy(() => import("../ProductList/index.js"));
const AddProduct = React.lazy(() => import("../AddProduct/index.js"));
const Account = React.lazy(() => import("../Account/index.jsx"));
const DashBoard = React.lazy(() => import("../Dashboard/index.js"));

function Home() {
  return (
    <Layout className="home">
      <HeaderCP />
      <Layout className="home-main">
        <SiteBarCP />
        <Layout className="home-content">
          <Content className="site-layout-background">
            <ScrollTop />
            <Suspense fallback={<Spin className="spin-load" />}>
              <Routes>
                <Route path="/products/add" element={<AddProduct />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route
                  path="/products/edit/:id"
                  element={<EditProduct />}
                ></Route>
                <Route
                  path="/products/detail/:id"
                  element={<ProductDetail />}
                ></Route>
                <Route path="/products" element={<ProductsList />}></Route>
                <Route path="/" element={<DashBoard />}></Route>
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
      <FooterCP />
    </Layout>
  );
}

export default Home;
