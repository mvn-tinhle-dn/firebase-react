import { Input, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import openNotificationWithIcon from "../../components/animations";
import {
  deleteProduct,
  getAllProducts,
  getAllTypes,
} from "../../services/product.services";
const { Search } = Input;

export default function ProductsL() {
  const [arrType, setArrType] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    getArrType();
  }, []);

  const getArrType = async () => {
    try {
      const arrTypeDoc = await getAllTypes();
      setArrType(arrTypeDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await getAllProducts();
    setDataSource(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //Processing data
  const dataShow = dataSearch.map((item, index) => {
    return (item = { ...item, key: item.id, no: index + 1 });
  });
  //set data column type
  const filterType = arrType.map((item) => {
    return {
      text: item.type,
      value: `${item.type}`,
    };
  });
  //data table
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Photo",
      dataIndex: "url",
      render: (url) => <img className="img-product" src={url} alt="" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Num",
      dataIndex: "num",
      key: "num",
      sorter: (a, b) => a.num - b.num,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => (
        <>
          {parseInt(price).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: filterType,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/products/detail/${record.id}`}>
            {" "}
            <button className="btn btn-view">
              <EyeOutlined />
            </button>
          </Link>
          <Link to={`/products/edit/${record.id}`}>
            <button className="btn btn-edit">
              <EditOutlined />
            </button>
          </Link>
          <button className="btn btn-delete" onClick={() => showModal(record)}>
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProdCur, setIsProdCur] = useState({});
  //on,of modal
  const showModal = (product) => {
    setIsModalVisible(true);
    setIsProdCur(product);
  };

  //delete
  async function handleDeleteProd(product) {
    setIsModalVisible(false);
    await deleteProduct(product.id);
    getProducts();
    openNotificationWithIcon("success", "Delete Product");
  }
  // Search
  useEffect(() => {
    const newDataSource = dataSource.filter((value) =>
      value.name.toLowerCase().includes(valueSearch.toLowerCase())
    );
    setDataSearch(newDataSource);
  }, [valueSearch, dataSource]);

  return (
    <div className="product-list">
      <h1 className="title-page">Products</h1>
      {/* Search */}
      <Space direction="vertical" className="input-search">
        <Search
          name="search"
          placeholder="Search Name...."
          allowClear
          size="large"
          onChange={(e) => setValueSearch(e.target.value)}
        />
      </Space>

      <Table dataSource={dataShow} columns={columns} />
      {/* Modal Delete */}
      <Modal
        title="Delete Product"
        open={isModalVisible}
        onOk={() => {
          handleDeleteProd(isProdCur);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        Are You Sure ?
      </Modal>
    </div>
  );
}
