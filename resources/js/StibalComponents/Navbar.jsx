import React from "react";

const navbarLists = [
    {
        id: 1,
        name: "Transaksi",
        subname: "ホーム",
        url: "/",
    },
    {
        id: 2,
        name: "Master Barang",
        subname: "ヌス",
        url: "/barang",
    },
    {
        id: 3,
        name: "Profile",
        subname: "マーク",
        url: "/profile",
    },
];

const Navbar = () => {
    return (
        <nav>
            <div className="container">
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8">
                    {navbarLists.map((navbarList, index) => {
                        return (
                            <div className="col-span-4" key={index}>
                                <a href={navbarList.url}>
                                    <div className="flex gap-4">
                                        <p className="font-black text-primary700 tracking-[4px]">
                                            0{navbarList.id}.
                                        </p>
                                        <div className="flex flex-col">
                                            <p className="uppercase font-black tracking-[4px] text-primary700">
                                                {navbarList.name}
                                            </p>
                                            <p className="text-sm tracking-[4px] text-primary500">
                                                {navbarList.subname}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
