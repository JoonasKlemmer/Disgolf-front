"use client"
import React, { useState, useEffect, useContext } from "react";
import { IWishlist } from "@/domain/IWishlist";
import { IDisc } from "@/domain/IDisc";
import WishlistService from "@/services/WishlistService";
import DiscsInWishlistService from "@/services/DiscsInWishlistService";
import { AppContext } from "@/state/AppContext";

export default function Wishlist() {
    const [isLoading, setIsLoading] = useState(true);
    const [wishlists, setWishlists] = useState<IWishlist[]>([]);
    const [selectedWishlist, setSelectedWishlist] = useState<string | null>(null);
    const [discsInWishlist, setDiscsInWishlist] = useState<IDisc[]>([]);
    const { userInfo } = useContext(AppContext)!;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const wishlistResponse = await WishlistService.getAll(userInfo!.jwt);
                if (wishlistResponse.data) {
                    setWishlists(wishlistResponse.data);
                    // Fetch discs in the wishlist
                    if (wishlistResponse.data.length > 0) {
                        const firstWishlistId = wishlistResponse.data[0].id;
                        const discsResponse = await DiscsInWishlistService.getWishlistById(userInfo!.jwt);
                        if (discsResponse.data) {
                            setDiscsInWishlist(discsResponse.data);
                        }
                    }
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading wishlists:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userInfo]);

    const handleDeleteFromWishlist = async (discsInWishlistId: string) => {
        try {
            await DiscsInWishlistService.deleteFromWishlist(userInfo!.jwt, discsInWishlistId);
            // Update discs in the wishlist after deletion
            const updatedDiscsResponse = await DiscsInWishlistService.getWishlistById(userInfo!.jwt);
            if (updatedDiscsResponse.data) {
                setDiscsInWishlist(updatedDiscsResponse.data);
            }
        } catch (error) {
            console.error("Error deleting from wishlist:", error);
        }
    };

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    {wishlists.map((wishlist) => (
                        <div key={wishlist.id}>
                            <h1>{wishlist.wishlistName}</h1>
                            <div className="disc-grid">
                                {discsInWishlist.map((disc, index) => (
                                    <div key={index} className="disc-item">
                                        <h2>{disc.discName}</h2>
                                        <p>{disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}</p>
                                        <p>{disc.manufacturerName}</p>
                                        <p>{disc.categoryName}</p>
                                        <a href={disc.pageUrl}>{disc.discPrice}€</a><br/>
                                        <button onClick={() => handleDeleteFromWishlist(disc.discsInWishlistId)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
