import React from "react";
import { BsQrCodeScan } from "react-icons/bs";
import { LuQuote } from "react-icons/lu";
import { Link } from "react-router-dom";

const menus = [
    {
      id: 1,
      src: <BsQrCodeScan size={130}/>,
      title: "Extract information from QR code",
      page: "ExtractInformationFromQRCode",
    },
    {
      id: 2,
      src: <LuQuote size={130}/>,
      title: "Enclose value in single quotes",
      page: "EncloseValueInSingleQuotes",
    }
  ];

const Home = () => {

    return (
        <div>
          <div>
            <div
              data-aos="fade-down"
              data-aos-offset="100"
              className="flex justify-center gap-2 mt-[20vh]"
            >
              {menus.map(({ id, src, title, page }) => (
                <Link
                  to={page}
                  class="bg-white bg-opacity-5 rounded-2xl p-6 flex flex-col items-center group relative overflow-hidden transition duration-700 ease-in-out border-transparent border-2 hover:border-white dark:hover:bg-opacity-20 hover:bg-opacity-25 active:scale-105 active:duration-100"
                >
                  <span class="ease absolute right-0 -mt-12 h-72 w-8 translate-x-14 rotate-12 transform bg-white opacity-10 transition-all duration-500 group-hover:-translate-x-96"></span>
                  <span class="flex flex-col items-center gap-4">
                  {src}
                    <p className="text-center">{title}</p>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    };

export default Home;