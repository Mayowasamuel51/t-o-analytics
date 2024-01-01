import axios from 'axios'
import {
    useQuery,
} from '@tanstack/react-query';

const FetchComments = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: ()=> axios.get("https://to-backendapi-v1.vercel.app/api/comment")
  })
}

export default FetchComments