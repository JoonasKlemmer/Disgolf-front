// compare.tsx

"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/state/AppContext";
import { IDiscFromPage } from "@/domain/IDiscFromPage";
import Image from 'next/image'

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
            <div className="disc-grid">
                {compareList.map((disc, index) => (
                    <div key={index} className="disc-item">

                        <h2>{disc.name}</h2>
                        <p>{disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}</p>
                        <p>{disc.manufacturerName}</p>
                        <p>{disc.categoryName}</p>
                        <p>{disc.discPrice}</p>
                        <button onClick={() => handleRemoveFromCompare(disc.discsInWishlistId)} className="round-button">Remove</button>
                        <a href={disc.pageUrl} target="_blank" className="page-link" data-url={disc.pageUrl}>
                            <Image
                                src={disc.pictureUrl}
                                width={200}
                                height={200}
                                alt={disc.name}
                                className="image"
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
