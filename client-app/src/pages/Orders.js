import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, resetState } from "../features/auth/authSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên người dùng",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Thành tiền",
    dataIndex: "amount",
  },
  {
    title: "Thời gian",
    dataIndex: "date",
  },

  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [OrderId, setOrderId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setOrderId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      // amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/order/${orderState[i]._id}`}
            className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(orderState[i]._id)}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  // const deleteOrder = (e) => {
  //   dispatch(deleteAOrder(e));

  //   setOpen(false);
  //   setTimeout(() => {
  //     dispatch(getProducts());
  //   }, 100);
  // };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách đơn hàng</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
