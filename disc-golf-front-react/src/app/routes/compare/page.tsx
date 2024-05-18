"use client";
import { useContext, useEffect, useState } from "react";
import { IDisc } from "@/domain/IDisc";
import { userInfo } from "os";
import { handleAddToWishlist } from "@/components/handleAddtoWishlist";
import { AppContext } from "@/state/AppContext";



export default function Compare() {
    const [compareList, setCompareList] = useState<IDisc[]>([]);
    const { userInfo, } = useContext(AppContext)!;
    useEffect(() => {
        const savedCompareList = localStorage.getItem('compareList');
        if (savedCompareList) {
            setCompareList(JSON.parse(savedCompareList));
        }
    }, []);

    const handleRemoveFromCompare = (discId: string) => {
        const updatedCompareList = compareList.filter(disc => disc.discFromPageId !== discId);
        setCompareList(updatedCompareList);
        localStorage.setItem('compareList', JSON.stringify(updatedCompareList));
    };

    return (
        <div>
            <h1>Compare Discs</h1>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '16px' 
            }}>
                {compareList.map((disc, index) => (
                    <div key={index} className="disc-item">
                        <h2>{disc.discName}</h2>
                        <p>{disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}</p>
                        <p>{disc.manufacturerName}</p>
                        <p>{disc.categoryName}</p>
                        <a href={disc.pageUrl}>{disc.discPrice}€</a><br/>
                        {userInfo && (<button onClick={() => handleAddToWishlist(userInfo.jwt,disc)}>Add to Wishlist</button>)}
                        <button onClick={() => handleRemoveFromCompare(disc.discFromPageId)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
