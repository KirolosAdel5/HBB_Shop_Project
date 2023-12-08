// hooks/useCategories.js
import { useQuery } from 'react-query';
import axios from 'axios';
import apiConfig from "../config/apiConfig"

const fetchCategories = async () => {
  const response = await axios.get(`${apiConfig.apiUrl}/api/categories/men/`);
  return response.data.children;
};

const useCategories = () => {
  return useQuery('categories', fetchCategories);
};

export default useCategories;
