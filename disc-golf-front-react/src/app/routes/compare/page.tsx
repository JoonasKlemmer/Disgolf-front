// compare.tsx

"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/state/AppContext";
import { IDiscFromPage } from "@/domain/IDiscFromPage";

export default function Compare() {
    const [compareList, setCompareList] = useState<IDiscFromPage[]>([]);
    const { userInfo } = useContext(AppContext)!;
    const router = useRouter();

    useEffect(() => {
        const savedCompareList = localStorage.getItem("compareList");
        if (savedCompareList) {
            setCompareList(JSON.parse(savedCompareList));
        }
    }, []);

    const handleRemoveFromCompare = (discId: string) => {
        const updatedCompareList = compareList.filter((disc) => disc.discFromPageId !== discId);
        setCompareList(updatedCompareList);
        localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
    };

    return (
        <div>
            <h1>Compare Discs</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "16px",
                }}
            >
                {compareList.map((disc, index) => (
                    <div key={index} className="disc-item">
                        <h2>{disc.name}</h2>
                        <p>
                            {disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}
                        </p>
                        <p>{disc.manufacturerName}</p>
                        <p>{disc.categoryName}</p>
                        <p >{disc.discPrice}€</p>
                        <a href={disc.pageUrl}>Go to page</a>
                        <br />
                        <button onClick={() => handleRemoveFromCompare(disc.discFromPageId)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
