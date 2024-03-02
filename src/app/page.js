'use client'
import Image from "next/image";
import App from "./App";
import Getprice from "./Getprice";
import Cloud from "./Cloud";


import { createBrowserRouter, RouterProvider} from "react-router-dom";
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/getprice',
    element:<Getprice pdfUrl="your_pdf_url_here.pdf"/>
  },
  {
    path:'/upload',
    element:<Cloud/>
  }
 
  
])
export default function Home() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}
