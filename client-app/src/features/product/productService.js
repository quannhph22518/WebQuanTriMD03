<<<<<<< HEAD
import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(`${base_url}product/${product.id}`,
    {title: product.productData.title},config
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};

const getProductPrice = async(price) => {
  const response = await axios.get(`${base_url}producr/${price}`, config);

  return response.data
}

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  getProductPrice,
};

export default productService;
=======
import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(`${base_url}product/${product.id}`,
    {title: product.productData.title},config
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};

const getProductPrice = async(price) => {
  const response = await axios.get(`${base_url}producr/${price}`, config);

  return response.data
}

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  getProductPrice,
};

export default productService;
>>>>>>> a6c8c6b71b9ef510265e306c33775a3a4e7adc4d
