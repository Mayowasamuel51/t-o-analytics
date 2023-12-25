import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import FetchComments from "../hook/FetchComments";
import Loader from "./Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const api = import.meta.env.VITE_SPLUNK_SEND;
const api_educational = import.meta.env.VITE_EDUCATIONAL_SEND;
const Links = () => {
  const email = localStorage.getItem("user");
  const [data, setData] = useState([]);
  const [educational, setEducational] = useState([]);

  const geteductional = async () => {
    try {
      const link = await axios.get(
        `${api_educational}linkeducational/${email}`
        ,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
          }
        }
      );
      console.log(link.data.response);
      if (link.status === 201 || link.status === 200) {
        setEducational(link.data.response);
      }
    } catch (err) {
      const response = err.response;
      if (response.status === 404) {
        console.log(response.data.message);
      } else if (response.status === 403) {
        console.log(response.data.message);
      }
    }
  };
  useEffect(() => {
    axios
      .get(`${api}link/${email}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.response);
          setData(res.data.response);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 404) {
          console.log(response.data.message);
        } else if (response.status === 403) {
          console.log(response.data.message);
        }
      });
    geteductional();
  }, []);

  return (
    <>
      <div>
        {/* Timi note the  links will be shown in two nice looking  tables splunk table and educational table , along with date it was sent
        use  react query
        */}
        {data.map((x) => {
          return (
            <div key={x._id}>
              <h1>{x.link}</h1>
            </div>
          );
        })}
        {educational.map((x) => {
          return (
            <div key={x._id}>
              <h1>{x.link}</h1>
            </div>
          );
        })}
        <h1>LINKS PAGESsdsacadsd</h1>
      </div>
    </>
  );
};

export default Links;
