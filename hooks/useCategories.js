// hooks/useCategories.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCategories = async () => {
  const response = await axios.get('http://localhost:8000/api/categories/men/');
  return response.data.children;
};

const useCategories = () => {
  return useQuery('categories', fetchCategories);
};

export default useCategories;
