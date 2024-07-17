import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Thương hiệu",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Loại sản phẩm",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Productlist = () => {
  
  const [open, setOpen] = useState(false);
  const [productID, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  // console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Danh sách sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productID);
        }}
        title="Bạn có chắc chắn muốn xóa?"
      />
    </div>
  );
};

export default Productlist;
