import axios from 'axios'
import {
    useQuery,
} from '@tanstack/react-query';

const FetchContractors = () => {
  return useQuery({
    queryKey: ["contractors"],
    queryFn: ()=> axios.get("https://to-backendapi-v1.vercel.app/api/contractors")
  })
}

export default FetchContractors