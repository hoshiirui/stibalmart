import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = (props) => {
    const handleNewItem = async (idBarang) => {
        try {
            // Make a POST request to 'api/v1/transaksi/newItem' with the idBarang
            const { data: responseAdd } = await axios.post(
                "api/v1/transaksi/newItem",
                {
                    idHeader: props.transaksiHeaderId,
                    idBarang: idBarang,
                    qty: 1, // Assuming the quantity is 1 for each click, you can adjust as needed
                    catatan: "-", // You can add a note here if needed
                }
            );
            // Handle any success behavior (e.g., showing a message)
            console.log("Product added to cart successfully!");
            props.refreshTransaction(responseAdd.data.id);
        } catch (error) {
            // Handle any errors
            console.error("Error adding product to cart:", error.message);
        }
    };

    return (
        <div className="flex flex-col mt-6 col-span-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden sm:rounded-lg flex flex-col p-4">
                        <div className="flex flex-wrap gap-4">
                            {props.productData &&
                                props.productData.map((barang, index) => (
                                    <div
                                        className="col-span-3 flex flex-col justify-center align-middle border border-gray-300 px-4 py-2 rounded-lg w-[100px]"
                                        key={index}
                                        style={{
                                            flexBasis: "calc(32.33% - 8px)",
                                        }} // Adjust width based on the number of items per row and gap
                                        onClick={() =>
                                            handleNewItem(barang.kode)
                                        } // Add onClick handler to trigger addToCart function with product id
                                    >
                                        <img
                                            src="/food/Snow_Queen_Icon.webp"
                                            alt="lamy"
                                            width={"100px"}
                                            className="text-center"
                                        />
                                        <p className="text-center">
                                            {barang.nama}
                                        </p>
                                        <p className="text-center text-gray-400 text-sm">
                                            {barang.hargaJual}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
