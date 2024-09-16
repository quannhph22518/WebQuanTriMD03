<<<<<<< HEAD
// Dashboard.js
import React, { useEffect, useState } from "react";
import { Table, DatePicker, message } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import axios from "axios";
import { base_url } from "../utils/baseUrl"; // Ensure base_url is correctly set
import { config } from "../utils/axiosconfig"; // Import the config for headers

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Sản Phẩm",
    dataIndex: "product",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
  },
];

const Dashboard = () => {
  const today = new Date(); // Get the current date
  const [revenueData, setRevenueData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [dateRange, setDateRange] = useState([today, today]); // Set initial date range to today
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);
  const [topSellingProducts, setTopSellingProducts] = useState([]); // State for top 5 products

  // Fetch revenue data based on selected date range
  const fetchRevenueData = async () => {
    try {
      const response = await axios.get(
        `${base_url}static/revenue-by-date`,
        {
          params: {
            startDate: dateRange[0]?.toISOString().split("T")[0], // Format date to YYYY-MM-DD
            endDate: dateRange[1]?.toISOString().split("T")[0], // Format date to YYYY-MM-DD
          },
          ...config, // Add the config object with headers
        }
      );
      setRevenueData(response.data);
      formatChartData(response.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      message.error("Chưa có đơn hàng mới ngày hôm nay.");
    }
  };

  // Fetch current day, month, and year revenue
  const fetchCurrentRevenue = async () => {
    try {
      const response = await axios.get(
        `${base_url}static/current-revenue`,
        config
      );
      const { dailyRevenue, monthlyRevenue, yearlyRevenue } = response.data;
      setDailyRevenue(dailyRevenue.totalRevenue || 0);
      setMonthlyRevenue(monthlyRevenue.totalRevenue || 0);
      setYearlyRevenue(yearlyRevenue.totalRevenue || 0);
    } catch (error) {
      console.error("Error fetching current revenue:", error);
      message.error("Lỗi khi doanh thu.");
    }
  };

  // Fetch top 5 best-selling products within the selected date range
  const fetchTopSellingProducts = async () => {
    try {
      const response = await axios.get(
        `${base_url}static/top-5-selling-products-by-date`,
        {
          params: {
            startDate: dateRange[0]?.toISOString().split("T")[0], // Format date to YYYY-MM-DD
            endDate: dateRange[1]?.toISOString().split("T")[0], // Format date to YYYY-MM-DD
          },
          ...config,
        }
      );
      const formattedData = response.data.map((item, index) => ({
        key: index + 1,
        product: item.productDetails.title,
        quantity: item.totalSold,
      }));
      setTopSellingProducts(formattedData);
    } catch (error) {
      console.error("Error fetching top-selling products:", error);
      message.error("Lỗi khi lấy danh sách sản phẩm bán chạy.");
    }
  };

  // Format data for Chart.js
  const formatChartData = (data) => {
    const labels = data.map((item) => item._id); // Assuming `_id` contains the date
    const revenues = data.map((item) => item.totalRevenue); // Assuming `totalRevenue` contains the revenue amount
    setChartData({
      labels,
      datasets: [
        {
          label: "Doanh thu",
          data: revenues,
          borderColor: "#ffd333",
          fill: false,
          tension: 0.1,
        },
      ],
    });

    // Check if there is no data and show a message
    if (data.length === 0) {
      message.info("Chưa có đơn hàng ngày hôm nay.");
    }
  };

  useEffect(() => {
    fetchRevenueData(); // Fetch data when date range changes or on initial load
    fetchTopSellingProducts(); // Fetch top-selling products when date range changes
  }, [dateRange]);

  useEffect(() => {
    fetchCurrentRevenue(); // Fetch current day, month, and year revenue on initial load
  }, []);

  const onDateChange = (dates) => {
    setDateRange(dates); // Update the date range state when the user selects a new date range
  };

  return (
    <div>
      <h3 className="mb-4 title">Thống kê</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Doanh thu ngày</p>
            <h4 className="mb-0 sub-title">
              {dailyRevenue.toLocaleString()} VNĐ
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Doanh thu tháng</p>
            <h4 className="mb-0 sub-title">
              {monthlyRevenue.toLocaleString()} VNĐ
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Doanh thu năm</p>
            <h4 className="mb-0 sub-title">
              {yearlyRevenue.toLocaleString()} VNĐ
            </h4>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Thống kê doanh thu</h3>
        <DatePicker.RangePicker onChange={onDateChange} format="YYYY-MM-DD" />
        {chartData.labels.length > 0 ? (
          <Line data={chartData} options={{ responsive: true }} />
        ) : (
          <p>Chưa có đơn hàng ngày hôm nay.</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Top 5 sản phẩm bán chạy</h3>
        <Table columns={columns} dataSource={topSellingProducts} />
      </div>
    </div>
  );
};

export default Dashboard;
=======
import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { getProductAPrice } from "../features/product/productSlice";
import useSelection from "antd/es/table/hooks/useSelection";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import CharByDate from "../features/chart/chartByDate";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
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
    title: "Sản Phẩm",
    dataIndex: "product",
  },
  {
    title: "Địa chỉ",
    dataIndex: "staus",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {
  const data = [
    {
      type: "Tháng 1",
      sales: 38,
    },
    {
      type: "Tháng 2",
      sales: 52,
    },
    {
      type: "Tháng 3",
      sales: 61,
    },
    {
      type: "Tháng 4",
      sales: 145,
    },
    {
      type: "Tháng 5",
      sales: 48,
    },
    {
      type: "Tháng 6",
      sales: 38,
    },
    {
      type: "Tháng 7",
      sales: 38,
    },
    {
      type: "Tháng 8",
      sales: 38,
    },
    {
      type: "Tháng 9",
      sales: 38,
    },
    {
      type: "Tháng 10",
      sales: 38,
    },
    {
      type: "Tháng 11",
      sales: 38,
    },
    {
      type: "Tháng 12",
      sales: 38,
    },
  ];
  const ProductPriceState = useSelection((state) => state.product.products)
  
  
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      // position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Thống kê</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">so với tháng 5 2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">So với tháng 6 2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">so với tháng 7 2024</p>
          </div>
        </div>
        </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Thống kê tuần vừa rồi</h3>
        <div>
        <CharByDate/>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Những đơn đặt hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
>>>>>>> a6c8c6b71b9ef510265e306c33775a3a4e7adc4d
