<<<<<<< HEAD
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
=======
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
>>>>>>> a6c8c6b71b9ef510265e306c33775a3a4e7adc4d
