import React from "react";
import {
  BsGithub,
  BsTelegram,
  BsYoutube,
  BsSkype,
  BsLinkedin,
  BsPersonBadgeFill,
} from "react-icons/bs";
const Footer = (props) => {
  return (
    <div
      className={`absolute bottom-0 ${props.className} w-full h-[100px] md:h-[50px] bg-slate-200 dark:bg-[rgb(22,27,34)] dark:text-[#A3B3BC] 
    text-slate-00 flex flex-col md:flex-row justify-evenly items-center`}
    >
      <div className="flex social-link">
        <a
          href="https://7piseth.github.io/maportfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsPersonBadgeFill size={25} />
        </a>
        <a
          href="https://github.com/7PiSeth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub size={25} />
        </a>
        <a
          href="https://youtube.com/@pisethseam7746"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsYoutube size={25} />
        </a>
        <a
          href="https://t.me/PiSethSeam"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTelegram size={25} />
        </a>
        <a
          href="https://join.skype.com/invite/VueXnSZyMpar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsSkype size={25} />
        </a>
        <a
          href="https://www.linkedin.com/in/piseth-seam-a74264178/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLinkedin size={25} />
        </a>

      </div>
      <p class="md:mr-5 text-center">
        Copyright © 2024 <b>PiSeth</b> | All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
