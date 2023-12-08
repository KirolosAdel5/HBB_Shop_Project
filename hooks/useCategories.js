// hooks/useCategories.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchCategories = async () => {
  const response = await axios.get('https://kirolosadel5.pythonanywhere.com/api/categories/men/');
  return response.data.children;
};

const useCategories = () => {
  return useQuery('categories', fetchCategories);
};

export default useCategories;
