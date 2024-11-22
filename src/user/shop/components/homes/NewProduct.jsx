const NewProduct = () => {
  // List => New Product
  const listNewProducts = [
    {
      id: 1,
      name: "Shock DBS Aerox",
      image: "./product/new/shockdbs-aerox.png",
      price: "Rp.1.100.000",
      specs: "Enhanced durability for smoother rides",
    },
    {
      id: 2,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
  ];

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Produk Terbaru</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {listNewProducts.map((product) => (
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

export default NewProduct;
