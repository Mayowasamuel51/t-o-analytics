import axios from 'axios'
import {
    useQuery,
} from '@tanstack/react-query';
const api = import.meta.env.VITE_BACKEND_API
const FetchAllStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: ()=> axios.get(`${api}/api/show`)
  })
  
}

export default FetchAllStudents
