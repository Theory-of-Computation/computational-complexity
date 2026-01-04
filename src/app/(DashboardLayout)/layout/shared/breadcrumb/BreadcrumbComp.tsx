"use client";

import CardBox from "@/app/components/shared/CardBox";
import { Meteors } from "@/components/ui/meteors";
import { JSX } from "react";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
  emoji?: string;
}

const BreadcrumbComp = ({ items, title, emoji }: BreadCrumbType) => {
  return (
    <>
      <CardBox
        className={` mb-6 py-4 bg-lightsecondary  dark:bg-darkinfo overflow-hidden  border-none shadow-none! dark:shadow-none! relative`}
      >
        <Meteors number={50} />
        <div className=" items-center grid grid-cols-12 gap-6">
          <div className="col-span-10">
            <h4 className="font-semibold text-xl text-customdark mb-3">
              {title}
            </h4>
            <ol
              className="flex items-center whitespace-nowrap"
              aria-label="Breadcrumb"
            >
              <li className="flex items-center">
                <a
                  className="opacity-90 text-lg text-charcoal leading-none"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <div className="p-1 rounded-full bg-dark dark:bg-darklink mx-3 flex items-center"></div>
              </li>
              <li
                className="flex items-center text-lg text-charcoal leading-none"
                aria-current="page"
              >
                {title}
              </li>
            </ol>
          </div>
          {/* <div className='col-span-2 flex justify-center -mb-10'>
            <Image
              src={'/images/breadcrumb/ChatBc.png'}
              alt=''
              className='md:-mb-[31px] -mb-4'
              width={140}
              height={150}
            />
          </div> */}
          <div className="col-span-2 flex justify-center -mb-7 max-h-[120px] max-w-[140px]">
            <div className="hidden sm:flex absolute right-7 bottom-1 items-center justify-center h-[88px] w-[88px] rounded-2xl  border border-black/5 shadow-lg backdrop-blur">
              <span className="text-4xl" aria-hidden="true">
                {emoji || "✨"}
              </span>
              <span className="sr-only">{emoji ? `${title} icon` : "Breadcrumb icon"}</span>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default BreadcrumbComp;
