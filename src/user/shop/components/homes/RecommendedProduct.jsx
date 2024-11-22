const RecommendedProduct = () => {
  // List => Recommended Product
  const listRecommendedProducts = [
    {
      id: 11,
      name: "Shock Fushimaya Beat FI/Karbu/Street",
      image: "./product/second/shockfushimaya-beat.png",
      price: "Rp.850.000",
      specs: "Exceptional strength for smoother rides",
    },
    {
      id: 12,
      name: "Kampas Ganda Beat FI/Karbu/Street",
      image: "./product/second/kampasganda-beat.png",
      price: "Rp.180.000",
      specs: "Consistent clutch performance",
    },
  ];

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Rekomendasi Produk</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {listRecommendedProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-xs text-gray-600">{product.specs}</p>
                <p className="text-orange-500 font-bold">{product.price}</p>
                <button className="mt-2 w-full bg-orange-500 text-white py-1 rounded-md hover:bg-orange-600">Tambah ke Keranjang</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProduct;
