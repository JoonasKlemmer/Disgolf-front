"use client"
import { SetStateAction, useContext, useEffect, useState } from "react";
import { IDisc } from "@/domain/IDisc";
import DiscService from "@/services/DiscService";
import WishlistService from "@/services/WishlistService";
import { AppContext } from "@/state/AppContext";
import DiscsInWishlistService from "@/services/DiscsInWishlistService";

export default function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [discs, setDiscs] = useState<IDisc[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDiscs, setSelectedDiscs] = useState<IDisc[]>([]);
    const { userInfo,} = useContext(AppContext)!;
    const loadData = async () => {
        const response = await DiscService.getAll();
        if (response.data) {
            setDiscs(response.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredDiscs = discs.filter((disc) =>
        disc.discName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchTerm(e.target.value);
    };

    const handleAddToWishlist = async (disc: IDisc) => {
        try {
            const wishlistResponse = await WishlistService.getAll(userInfo!.jwt); // Assuming this function gets all wishlists for the user
            if (wishlistResponse.data && wishlistResponse.data.length > 0) {
                const wishlistId = wishlistResponse.data[0].id; // Assuming there's only one wishlist per user 
                
                 DiscsInWishlistService.addDiscToWishlist(userInfo!.jwt,wishlistId,disc.discFromPageId)
            } else {
                console.log("No wishlist found for the user.");
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
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
                        <p>Speed: {disc.speed}</p>
                        <p>Glide: {disc.glide}</p>
                        <p>Turn: {disc.turn}</p>
                        <p>Fade: {disc.fade}</p>
                        <p>Manufacturer: {disc.manufacturerName}</p>
                        <p>Category: {disc.categoryName}</p>
                        <p>Price: ${disc.discPrice}</p>
                        <a href={disc.pageUrl}>Go to page</a>
                        <a onClick={() => handleAddToWishlist(disc)}>Add to Wishlist</a>
                    </div>
                ))}
            </div>
        </div>
    );
}