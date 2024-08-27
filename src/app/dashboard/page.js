import NavBar from '@/Components/NavBar';
import ProductCard from '@/Components/ProductCard'; // Make sure to create this component
import axios from 'axios';



export default async function Dashboard() {
  let products = null;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/getProducts/`);
    if(response){
        products = response.data
    }
  } catch (err) {
    console.log(err)
  }

  if(products === null){
   return (
    <div className='h-[680px] xl:h-screen bg-white flex flex-col justify-center items-center'>
    <p className='text-6xl text-orange-400 animate-bounce'>....</p>
    </div>
   ) 
  }


  return (
    <>
      <NavBar />
      {products !== null ? <div className="p-4">
        <h1 className="text-xl uppercase text-orange-400 font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div> 
      :
      <div className='h-[680px] xl:h-screen bg-white flex flex-col justify-center items-center'>
          <p className='text-6xl text-orange-400 animate-bounce'>....</p>
     </div>
      }
    </>
  );
}