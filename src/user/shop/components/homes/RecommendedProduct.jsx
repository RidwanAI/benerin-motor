const RecommendedProduct = () => {
  // List => Recommended Product
  const listRecommendedProducts = [
    {
      id: 1,
      name: "Shock Fushimaya Beat FI/Karbu/Street",
      image: "./product/second/shockfushimaya-beat.png",
      price: "Rp.850.000",
      specs: "Exceptional strength for smoother rides",
    },
    {
      id: 2,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      image: "./product/second/kampasganda-beat.png",
      price: "Rp.180.000",
      specs: "Consistent clutch performance",
    },
    {
      id: 3,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      image: "./product/second/kampasganda-beat.png",
      price: "Rp.180.000",
      specs: "Consistent clutch performance",
    },
    {
      id: 4,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      image: "./product/second/kampasganda-beat.png",
      price: "Rp.180.000",
      specs: "Consistent clutch performance",
    },
    {
      id: 5,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      image: "./product/second/kampasganda-beat.png",
      price: "Rp.180.000",
      specs: "Consistent clutch performance",
    },
    {
      id: 6,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      image: "./product/second/kampasganda-beat.png",
      price: "Rp.180.000",
      specs: "Consistent clutch performance",
    },
  ];

  return (
    <section className="bg-slate-200 p-3 space-y-3 ">
      <h2 className="font-semibold text-xl md:text-2xl">Recommended Product</h2>
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listRecommendedProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-xs text-gray-600">{product.specs}</p>
              <p className="text-orange-500 font-bold">{product.price}</p>
              <button className="bg-orange-500 px-3 py-1 rounded-sm text-white w-full md:px-5 md:py-1.5 hover:bg-orange-600">Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProduct;
