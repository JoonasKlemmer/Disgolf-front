"use client";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { IDisc } from "@/domain/IDisc";
import DiscService from "@/services/DiscService";
import { AppContext } from "@/state/AppContext";
import { handleAddToWishlist } from "@/components/handleAddtoWishlist";

export default function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [discs, setDiscs] = useState<IDisc[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDiscs, setSelectedDiscs] = useState<IDisc[]>([]);
    const [compareList, setCompareList] = useState<IDisc[]>([]);
    const { userInfo, } = useContext(AppContext)!;

    const loadData = async () => {
        const response = await DiscService.getAll();
        if (response.data) {
            setDiscs(response.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
        const savedCompareList = localStorage.getItem('compareList');
        if (savedCompareList) {
            setCompareList(JSON.parse(savedCompareList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('compareList', JSON.stringify(compareList));
    }, [compareList]);

    const filteredDiscs = discs.filter((disc) =>
        disc.discName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchTerm(e.target.value);
    };

   

    const handleAddToCompare = (disc: IDisc) => {
        setCompareList((prevList) => {
            if (!prevList.some(item => item.discFromPageId === disc.discFromPageId)) {
                return [...prevList, disc];
            }
            return prevList;
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search discs..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="disc-grid">
                {filteredDiscs.map((disc, index) => (
                    <div key={index} className="disc-item">
                        <h2>{disc.discName}</h2>
                        <p>{disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}</p>
                        <p>{disc.manufacturerName}</p>
                        <p>{disc.categoryName}</p>
                        <a href={disc.pageUrl}>{disc.discPrice}€</a><br />
                        {userInfo && (<button onClick={() => handleAddToWishlist(userInfo.jwt,disc)}>Add to Wishlist</button>)}
                        <button onClick={() => handleAddToCompare(disc)}>Compare</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
