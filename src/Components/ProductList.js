import React from "react";

const ProductList = ({product}) => {
  return (
    <div className="p-4 border flex flex-col md:flex-row items-center justify-between border-gray-400 rounded-md shadow-sm bg-white">
    <div className="">   
    <img src={product.image} alt={product.productName} className="w-48 h-48 object-cover rounded-md mb-4" />
    </div>
    <div>
    <h2 className="text-lg font-semibold mb-2">Product Name : {product.productName}</h2>
    <h2 className="text-md font-medium mb-2">Product id : {product.id}</h2>
    <p className="text-gray-600 mb-2">Price: ${product.price}</p>
    </div>
    <div className="p-2">
    <p className={`text-sm font-bold uppercase ${product.status === 'approved' ? 'text-green-500' : product.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
        Status: {product.status}
    </p>
    </div>

</div>
  );
};

export default ProductList;
