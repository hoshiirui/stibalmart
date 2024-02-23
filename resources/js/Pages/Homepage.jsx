import React, { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/StibalComponents/Navbar";
import ShiraHeader from "@/StibalComponents/header/ShiraHeader";
import ProductList from "@/StibalComponents/Widgets/ProductList";
import LoadingOverlay from "@/StibalComponents/Loading/LoadingOverlay";
import axios from "axios";
import EditItemsModal from "@/StibalComponents/Modal/EditItemsModal";

export default function Homepage(props) {
    const [loading, setLoading] = useState(true);
    const [dataTransaksi, setDataTransaksi] = useState(null);
    const [total, setTotal] = useState(0);
    const [productData, setProductData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalItemsData, setModalItemsData] = useState(null);
    const [highlightedId, setHighlightedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: responseTransaksi } = await axios.get(
                    "api/v1/transaksi/current"
                );
                setDataTransaksi(responseTransaksi.transaksi);
                const { data: responseBarang } = await axios.get(
                    "api/v1/barang"
                );
                setProductData(responseBarang.barang);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dataTransaksi) {
            // Calculate total when dataTransaksi changes
            let newTotal = 0;
            dataTransaksi.details.forEach((detail) => {
                newTotal += detail.qty * detail.barang.hargaJual;
            });
            setTotal(newTotal);
        }
    }, [dataTransaksi]);

    const fetchTransactionData = async (id) => {
        try {
            const { data: responseTransaksi } = await axios.get(
                "api/v1/transaksi/current"
            );
            setDataTransaksi(responseTransaksi.transaksi);
        } catch (error) {
            console.error(error.message);
        }

        setHighlightedId(id);
    };

    const deleteItems = async (idItems) => {
        try {
            await axios.delete(`api/v1/transaksi/deleteItem/${idItems}`);
            fetchTransactionData();
        } catch (error) {
            console.error(error.message);
        }
    };

    const clearNota = async () => {};

    const saveTransaction = async () => {
        try {
            // Make a POST request to 'api/v1/transaksi/newItem' with the idBarang
            await axios.post("api/v1/transaksi/saveTransaction");
            // Handle any success behavior (e.g., showing a message)
            console.log("Transaksi berhasil disimpan");
            fetchTransactionData(null);
            window.location.reload();
        } catch (error) {
            // Handle any errors
            console.error("Transaksi gagal disimpan", error.message);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalItemsData(null);
    };

    const openModal = (data) => {
        setShowModal(true);
        console.log("dari open modal data" + data);
        setModalItemsData(data);
    };

    console.log(dataTransaksi);
    console.log(highlightedId);

    return (
        <>
            {loading && <LoadingOverlay />}

            {!loading && (
                <>
                    <Head>
                        <title>Stibal Mart - Homepage</title>
                        <meta
                            name="description"
                            content="Your page description"
                        />
                        {/* Other head elements */}
                    </Head>
                    <div className="flex flex-col gap-[88px] py-[88px]">
                        <div className="flex justify-center items-center">
                            <img
                                src="/logo/lipsum.svg"
                                alt="logo-lipsum"
                                width={"215px"}
                            />
                        </div>
                        <Navbar />
                        <div className="flex flex-row items-start justify-center py-10 container gap-6">
                            <ProductList
                                productData={productData}
                                refreshTransaction={fetchTransactionData}
                                transaksiHeaderId={dataTransaksi.id}
                            />
                            <div className="flex flex-col mt-6 col-span-6">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden sm:rounded-lg">
                                            <div className="px-6 py-4">
                                                <p className="text-lg font-bold">
                                                    Transaksi Baru
                                                </p>
                                                <div className="flex flex-row justify-between">
                                                    {" "}
                                                    <p className="text-sm text-gray-400">
                                                        Tanggal:{" "}
                                                        {
                                                            dataTransaksi.created_at
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        Id Transaksi:{" "}
                                                        {dataTransaksi.id}
                                                    </p>
                                                </div>
                                            </div>

                                            <table className="min-w-full text-sm text-gray-900">
                                                <thead className="text-xs uppercase font-medium border-b border-gray-300">
                                                    <tr>
                                                        <th></th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left tracking-wider"
                                                        >
                                                            Barang
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left tracking-wider"
                                                        >
                                                            Qty
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left tracking-wider"
                                                        >
                                                            Catatan
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left tracking-wider"
                                                        >
                                                            Total
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left tracking-wider"
                                                        >
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataTransaksi &&
                                                        dataTransaksi.details.map(
                                                            (detail, index) => (
                                                                <tr
                                                                    key={
                                                                        detail.id
                                                                    }
                                                                    className={
                                                                        highlightedId ===
                                                                        detail.id
                                                                            ? "bg-red-200"
                                                                            : ""
                                                                    }
                                                                >
                                                                    <td className="pl-4">
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td className="flex px-6 py-4 whitespace-nowrap">
                                                                        {
                                                                            detail
                                                                                .barang
                                                                                .nama
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {
                                                                            detail.qty
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {
                                                                            detail.catatan
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {detail.qty *
                                                                            detail
                                                                                .barang
                                                                                .hargaJual}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap flex flex-row gap-4">
                                                                        <button
                                                                            className="rounded-sm bg-blue-300 px-6 py-2 text-white font-bold"
                                                                            onClick={() =>
                                                                                openModal(
                                                                                    detail
                                                                                )
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            className="rounded-sm bg-red-300 px-6 py-2 text-white font-bold"
                                                                            onClick={() =>
                                                                                deleteItems(
                                                                                    detail.id
                                                                                )
                                                                            }
                                                                        >
                                                                            Del
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    <tr key="sdlfjdslf">
                                                        <td className="px-6 py-4 whitespace-nowrap"></td>
                                                        <td className="px-6 py-4 whitespace-nowrap"></td>
                                                        <td className="px-6 py-4 whitespace-nowrap"></td>
                                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                                            GRAND TOTAL
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                                            {total}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                                            <button
                                                                className="rounded-sm bg-green-300 px-6 py-2 text-white font-bold"
                                                                onClick={() =>
                                                                    saveTransaction()
                                                                }
                                                            >
                                                                Simpan
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MODAL HERE */}
                    {showModal ? (
                        <EditItemsModal
                            closeModal={closeModal}
                            itemsData={modalItemsData}
                            refreshTransaction={fetchTransactionData}
                        />
                    ) : null}
                </>
            )}
        </>
    );
}
