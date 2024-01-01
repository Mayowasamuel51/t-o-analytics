import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import NoBlog from "../components/NoBlog"
import FetchBlogs from "../hooks/FetchBlogs"
import { useInView } from "framer-motion";
import Loader from "../components/Loader";


const BlogPage = () => {
  const lastBlogRef = useRef(null)
  const [blogNumber, setBlogNumber] = useState(4)
  const { data, isLoading, error } = FetchBlogs()
  // console.log(data?.data?.items)
  const isInView = useInView(lastBlogRef, { once: true})

  useEffect(() => {
    if (isInView) {
      setBlogNumber((prevNumber) => prevNumber + 5);
    }
  }, [isInView]);

  if (isLoading) return <Loader />
  if (error) return <p className='text-center text-red-500 md:text-3xl font-black'>{error.message}</p>

  return (
    <>
      {!data?.data?.items.length && <NoBlog />}
      <section className="relative flex flex-col gap-3 md:gap-5 px-2 md:px-32 md:py-28">
        <h1 className="relative pl-3 stories text-lg font-bold">STORIES FOR YOU</h1>
        {data?.data?.items.map((blog, index)=> index <= blogNumber && (
          <Link to={blog.url} key={blog.id}  target="_blank">
            <div ref={data?.data?.items?.length - 1 && lastBlogRef} className="group flex items-center md:gap-3">
              
                <div className="flex-1">
                  <img src={blog.image} alt={`Blog Image for ${blog.title}`} className="w-[100px] md:w-[200px] object-cover aspect-square rounded-md" />
                </div>
                <div className="flex-[4]">
                  <p>{(new Date(blog.date_published)).toLocaleDateString()}</p>
                  <h1 className="text-sm md:text-2xl font-bold group-hover:text-BLUE duration-200">{blog.title}</h1>
                  <p className="text-xs md:text-lg">{blog.content_text}</p>
                </div>
            </div>
            </Link>
          
        ))}
      </section>
    </>
  )
}

export default BlogPage