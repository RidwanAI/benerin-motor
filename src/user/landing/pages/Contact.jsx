import Layout from "./Layout";

const Contact = () => {
  return (
    <Layout>
      <section id="about" className="font-poppins text-white ">
        <div className="bg-slate-900">
          <div className="flex flex-col gap-10 items-center justify-center max-w-7xl mx-auto px-3 py-20 w-full md:px-7">
            {/* About */}
            <div className="border border-orange-500 p-3 rounded-md space-y-1 text-justify">
              <p className="font-bold text-2xl">
                What is Benerin <span className="text-orange-500">Motor</span> ?
              </p>
              <p>
                Benerin Motor menyediakan layanan perbaikan dan pemeliharaan sepeda motor yang profesional, cepat, dan berkualitas tinggi. Dengan dukungan teknisi berpengalaman, kami siap menangani berbagai kebutuhan motor Anda—dari
                perawatan rutin hingga perbaikan mendalam. Selain itu, kami menyediakan beragam pilihan spare part berkualitas, baik baru maupun second, yang dapat diandalkan untuk menjaga performa kendaraan Anda. Fokus utama kami adalah
                memberikan layanan terbaik dengan harga bersahabat, mengutamakan kepuasan pelanggan, dan memastikan motor Anda selalu dalam kondisi optimal. Percayakan perawatan motor Anda kepada Benerin Motor, dan rasakan pengalaman
                berkendara yang aman dan nyaman setiap saat.
              </p>
            </div>

            {/* Dashboard */}
            <div className="flex flex-col font-semibold gap-4 items-center justify-between rounded-md text-center w-full md:flex-row">
              <div className="bg-orange-500 flex items-center justify-between py-2 px-4 rounded-md w-full md:flex-col">
                <p>Founded On The Date</p>
                <p className="flex items-center gap-2">{/* <ConstPortfolio target={10} duration={1500} /> */}</p>
              </div>
              <div className="bg-orange-500 flex items-center justify-between py-2 px-4 rounded-md w-full md:flex-col">
                <p>Founded On The Month</p>
                <p className="flex items-center gap-2">{/* <ConstPortfolio target={6} duration={1500} /> */}</p>
              </div>
              <div className="bg-orange-500 flex items-center justify-between py-2 px-4 rounded-md w-full md:flex-col">
                <p>Founded On The Year</p>
                <p className="flex items-center gap-2">{/* <ConstPortfolio target={2021} duration={1500} /> */}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
