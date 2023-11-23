import React from 'react'
import noBlog from "../assets/images/noblog.jpg"

const BlogPage = () => {
  return (
    <section class="min-h-screen text-center px-2 py-10 md:p-10 bg-white">
        <div class="">
            <img src={noBlog} class="mx-auto md:w-[500px]" alt=""/>
        </div>
        <h1 class="w-full md:w-1/2 mx-auto font-medium text-3xl md:text-4xl">Sorry, there are no blogs available right now. Please check back later</h1>
    </section>
  )
}

export default BlogPage