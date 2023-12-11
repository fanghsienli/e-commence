"use client";
import React, { useState } from "react";

export default function FilterBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openDesign, setOpenDesign] = useState(true);

  return (
    <div className="flex justify-center border-b bg-white">
      <div className="col-span-12 md:px-4 xl:px-8">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center lg:justify-start items-center h-full">
              <span
                className="col-12 lg:col-auto text-center uppercase font-semibold tracking-wide py-2 lg:py-2 lg:pe-0 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                Filter By
                <span className="lg:hidden text-secondary font-light">16</span>
                <span className="hidden lg:inline">:</span>
              </span>

              {isOpen && (
                <div className="col">
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="text-center font-semibold">Filter By</div>
                      <div
                        className="cursor-pointer ml-auto"
                        onClick={() => setIsOpen(false)}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {/* Sort By */}
                      <div>
                        <button
                          onClick={() => setOpenSort(!openSort)}
                          className="flex justify-between items-center px-3 lg:px-1 py-4 lg:py-2 font-semibold cursor-pointer"
                        >
                          <span>Sort By</span>
                        </button>
                        {openSort && (
                          <div className="py-1 px-3 lg:px-1">
                            {/* Sort options go here */}
                          </div>
                        )}
                      </div>

                      {/* Availability */}
                      <div>
                        <button
                          onClick={() => setOpenAvailability(!openAvailability)}
                          className="flex justify-between items-center px-3 lg:px-1 py-4 lg:py-2 font-semibold cursor-pointer"
                        >
                          <span>Availability</span>
                        </button>
                        {openAvailability && (
                          <div className="py-1 px-3 lg:px-1">
                            {/* Availability options go here */}
                          </div>
                        )}
                      </div>

                      {/* Products */}
                      <div>
                        <button
                          onClick={() => setOpenProducts(!openProducts)}
                          className="flex justify-between items-center px-3 lg:px-1 py-4 lg:py-2 font-semibold cursor-pointer"
                        >
                          <span>Products</span>
                        </button>
                        {openProducts && (
                          <div className="py-1 px-3 lg:px-1">
                            {/* Products options go here */}
                          </div>
                        )}
                      </div>

                      {/* Design */}
                      <div>
                        <button
                          onClick={() => setOpenDesign(!openDesign)}
                          className="flex justify-between items-center px-3 lg:px-1 py-4 lg:py-2 font-semibold cursor-pointer"
                        >
                          <span>Design</span>
                        </button>
                        {openDesign && (
                          <div className="py-1 px-3 lg:px-1">
                            {/* Design options go here */}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom buttons */}
                    <div className="absolute bottom-0 bg-white pt-3 pb-5">
                      <button className="btn btn-lg w-full btn-outline-primary text-primary bg-transparent filter-clear mt-1">
                        Clear Filters
                      </button>
                      <button
                        className="btn btn-lg w-full btn-primary filter-show mt-1"
                        onClick={() => setIsOpen(false)}
                      >
                        Show Results
                        <span className="font-light">(16)</span>
                      </button>
                      <button
                        className="btn btn-lg w-full btn-secondary filter-none mt-1"
                        disabled
                      >
                        No Results Found
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
