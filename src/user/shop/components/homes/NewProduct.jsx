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
    {
      id: 3,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
    {
      id: 4,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
    {
      id: 5,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
    {
      id: 6,
      name: "Kampas Ganda Aerox",
      image: "./product/new/kampasganda-aerox.png",
      price: "Rp.250.000",
      specs: "Efficient and long-lasting clutch pads",
    },
  ];

  return (
    <section className="font-poppins p-3 space-y-3">
      <h2 className="font-semibold text-xl md:text-2xl">Produk Terbaru</h2>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listNewProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-sm rounded-sm overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <div className="p-4 space-y-1">
              <p className="font-semibold text-md md:text-xl">{product.name}</p>
              <p className="italic text-sm text-slate-700">{product.specs}</p>
              <p className="font-bold text-slate-700">{product.price}</p>
              <button className="bg-orange-500 px-3 py-1 rounded-sm text-white w-full md:px-5 md:py-1.5 hover:bg-orange-600">Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewProduct;
