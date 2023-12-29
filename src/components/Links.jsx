import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import FetchComments from "../hook/FetchComments";
import ServerErrorPage from "./ServerErrorPage";
import Loader from "./Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const api = import.meta.env.VITE_SPLUNK_SEND;
const api_educational = import.meta.env.VITE_EDUCATIONAL_SEND;

const Links = () => {
  const email = localStorage.getItem("user");
  // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')
  const [data, setData] = useState([]);
  const [educational, setEducational] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // const { splunk, isLoading, error } = useQuery({
  //   queryKey: ["splunk-link", email, ACCESS_TOKEN],
  //   queryFn: async ({ queryKey }) => {
  //     const response = await axios.get(`${api}link/${queryKey[1]}`, {
  //       headers: {
  //         Authorization: `Bearer ${queryKey[2]}`,
  //       },

  //     })
  //     return response
  //   }
  // })
  // console.log(splunk)
  // const { consulting } = useQuery({
  //   queryKey: ["educational-consult-link", email, ACCESS_TOKEN],
  //   queryFn: async ({ queryKey }) => {
  //     const response = await axios.get(`${api_educational}linkeducational/${queryKey[1]}`, {
  //       headers: {
  //         Authorization: `Bearer ${queryKey[2]}`
  //       }
  //     })
  //     return response
  //   }
  // })
  // console.log(consulting)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}link/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      setLoading(true)
      if (response.status === 200 || response.status === 201) {
        console.log(response.data.response);
        setData(response.data.response);
        setLoading(false)
        setError(false)
      }
    } catch (err) {
      const response = err.response;
      console.log(err);
      if (response.status === 404) {
        setError(true)
        console.log(response.data.message);
      } else if (response.status === 403) {
        setError(true)
        console.log(response.data.message);
      }
    }
  };

  const geteductional = async () => {
    try {
      const links = await axios.get(
        `${api_educational}linkeducational/${email}`
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
          }
        }
      );
      setLoading(true)
      console.log(links.data.response);
      if (links.status === 201 || links.status === 200) {
        setEducational(links.data.response);
        setLoading(false)
        setError(false)
      }
    } catch (err) {
      const response = err.response;
      if (response.status === 404) {
        console.log(response.data.message);
        setLoading(false)
        setError(true)
      } else if (response.status === 403) {
        console.log(response.data.message);
        setLoading(false)
        setError(true)
      }
    }
  };

  useEffect(() => {
    fetchData();
    geteductional();
  }, [email]);

  // if (isLoading) return <Loader />
  // if (error) return <div className="text-base md:text-3xl text-red-500 text-center">Error...</div>;
  // if (data?.status === 500) return <ServerErrorPage />

  return (
    <>
      <div className="mx-auto p-2 md:p-10">
        {(error) && <div className="text-base md:text-3xl text-red-500 text-center">{error}</div>}
        {(loading) && <Loader />}
        <table className="rounded-md md:rounded-none md:mb-40 w-full table-fixed border-separate border-2 border-black border-spacing-1">
          <thead>
            <tr className="text-left">
              <th className="border-2 border-black p-2 font-black md:text-2xl">SPLUNK</th>
              <th className="border-2 border-black p-2 font-black md:text-2xl">EDUCATIONAL CONSULTING</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              {data.map((x) => {
                return (
                  <td data-cell="SPLUNK" key={x._id} className="border-2 border-black p-2">
                    <Link to={x.link} className="underline text-blue-500">{x.link}</Link>
                  </td>
                );
              })}
               {educational.map((x) => {
                return (
                  <td data-cell="EDUCATIONAL CONSULTING" key={x._id} className="border-2 border-black p-2">
                    <Link to={x.link} className="underline text-blue-500">{x.link}</Link>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        {(!data && !educational) && <h1 className="min-h-screenmd:text-2xl text-xl flex justify-center items-center">LINKS PAGE</h1>}
      </div>
    </>
  );
};

export default Links;
