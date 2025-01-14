import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async() => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const responseData = await response.json();

      setAllProducts(responseData.data || []);
    } catch (error) {
        console.log(error.message);
    }
  };

  useEffect(()=>{
      fetchAllProducts();
  })

  return (
    <div>
       <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg'>All Product</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>{setOpenUploadProduct(true)}}>Upload Product</button>
        </div>

        <div className='flex items-center gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProducts.map((product, index) => {
                return (
                  <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProducts}  />
                )
            })
          }
        </div>

        {/* upload product component */}
        {
          openUploadProduct && (
              <UploadProduct onClose={()=>{setOpenUploadProduct(false)}} fetchData={fetchAllProducts}/>
          )
        }

    </div>
  )
}

export default AllProducts