import React, { useState } from "react";

const EditItemsModal = (props) => {
    console.log(props);

    const [qty, setQty] = useState(props.itemsData.qty);
    const [catatan, setCatatan] = useState(props.itemsData.catatan);

    const handleSaveChanges = async () => {
        try {
            // Send a POST request to update the item
            await axios.patch(
                "http://127.0.0.1:8000/api/v1/transaksi/editItem/" +
                    props.itemsData.id,
                {
                    qty: qty,
                    catatan: catatan,
                }
            );

            // Close the modal after saving changes
            props.refreshTransaction(props.itemsData.id);
            props.closeModal();
        } catch (error) {
            console.error("Error saving changes:", error.message);
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                Edit Barang
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={props.closeModal}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto w-[500px]">
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                Qty (Jumlah Barang):
                            </p>
                            <input
                                type="text"
                                className="w-full"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            />
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                Catatan:
                            </p>
                            <input
                                type="text"
                                className="w-full"
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                            />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={props.closeModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default EditItemsModal;
