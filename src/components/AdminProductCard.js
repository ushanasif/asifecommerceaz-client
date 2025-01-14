import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayInrCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({data, fetchData}) => {
    const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded '>
       <div>
            <div >
                <img src={data?.productImage[0]} alt="" width={120} height={120} className='mx-auto object-fill h-full' />
            </div>
            <h2>{data.productName}</h2>

            <div >
                <p className='fotn-semibold'>
                    {
                      displayInrCurrency(data.sellingPrice)
                    }
                </p>
                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>{setEditProduct(true)}}>
                    <MdModeEditOutline />
                </div>
            </div>
       </div>

        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchData}/>
          )
        }
    </div>
  )
}

export default AdminProductCard