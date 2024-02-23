import { SparklesIcon } from "@heroicons/react/16/solid/index.js";
import React from "react";

const ShiraHeader = ({ title, subtitle }) => {
    return (
        <div className="flex gap-12 items-center">
            <SparklesIcon width={"20px"} className="text-primary700" />
            <div className="flex gap-4 items-center">
                <p className="text-[32px] font-black text-primary700 tracking-[4px] uppercase">
                    {title}
                </p>
                <p className="text text-primary500 tracking-[4px]">
                    /{subtitle}
                </p>
            </div>
            <div className="w-[156px] border-t-2 border-primary700 my-4"></div>
        </div>
    );
};

export default ShiraHeader;
