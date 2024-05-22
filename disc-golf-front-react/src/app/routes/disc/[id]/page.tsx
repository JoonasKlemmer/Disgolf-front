// disc.tsx

"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DiscFromPageService from "@/services/DiscFromPageService";
import { AppContext } from "@/state/AppContext";
import { handleAddToWishlist } from "@/components/AddOrRemoveFromWishlist";
import { IDiscFromPage } from "@/domain/IDiscFromPage";

export default function DiscDetails() {
    const [discs, setDiscs] = useState<IDiscFromPage[]>([]);
    const [compareList, setCompareList] = useState<IDiscFromPage[]>([]);
    const { userInfo } = useContext(AppContext)!;
    const router = useRouter();
    const params = useParams<{ id: string }>()

    useEffect(() => {
        const loadData = async () => {
            const response = await DiscFromPageService.getDiscFromPageById(params.id as string);

            if (response.data) {
                setDiscs(response.data);
            }
        };
        loadData();
    }, [params.id]);

    useEffect(() => {
        const savedCompareList = localStorage.getItem("compareList");
        if (savedCompareList) {
            setCompareList(JSON.parse(savedCompareList));
        }
    }, []);

    const handleCompare = (disc: IDiscFromPage) => {
        // Check if the disc is already in the compare list
        if (compareList.some((compareDisc) => compareDisc.discFromPageId === disc.discFromPageId)) {
            alert("This disc is already in the compare list.");
            return;
        }

        // If the disc is not in the compare list, add it
        const updatedCompareList = [...compareList, disc];
        setCompareList(updatedCompareList);
        localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
    };

    return (
        <div className="centered-container">
            <div className="disc-item">
                {discs.map((disc) => (
                    <div key={disc.discFromPageId} className="discs-item">
                        <a href={disc.pageUrl} target="_blank">
                            {disc.pageUrl}
                        </a>
                        <div className="price-buttons-container">
                            <p>{disc.discPrice}€</p>
                            {userInfo && (
                                <button onClick={() => handleAddToWishlist(disc)}>Add to Wishlist</button>
                            )}
                            <button onClick={() => handleCompare(disc)} className="action-button">
                                Compare
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
