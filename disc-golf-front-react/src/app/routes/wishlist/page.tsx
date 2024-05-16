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
                const response = await WishlistService.getAll(userInfo!.jwt);
                if (response.data) {
                    setWishlists(response.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading wishlists:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userInfo]);

    const handleWishlistClick = async (wishlistId: string) => {
        try {
            if (selectedWishlist === wishlistId) {
                // If the clicked wishlist is already selected, close it
                setSelectedWishlist(null);
                setDiscsInWishlist([]); // Clear discs in wishlist
            } else {
                // If a different wishlist is clicked, fetch discs and open it
                const response = await DiscsInWishlistService.getAll(userInfo!.jwt, wishlistId);
                if (response.data) {
                    setDiscsInWishlist(response.data);
                    setSelectedWishlist(wishlistId);
                }
            }
        } catch (error) {
            console.error("Error loading discs in wishlist:", error);
        }
    };

    return (
        <>
            <h1>Wishlist</h1>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <div>
                    {wishlists.map((wishlist) => (
                        <div key={wishlist.id}>
                            <h2 onClick={() => handleWishlistClick(wishlist.id)}>{wishlist.wishlistName}</h2>
                            {selectedWishlist === wishlist.id && (
                                discsInWishlist.map((disc, index) => (
                                    <div key={index}>
                                        <h2>{disc.discName}</h2>
                                        <p>Speed: {disc.speed}</p>
                                        <p>Glide: {disc.glide}</p>
                                        <p>Turn: {disc.turn}</p>
                                        <p>Fade: {disc.fade}</p>
                                        <p>Manufacturer: {disc.manufacturerName}</p>
                                        <p>Category: {disc.categoryName}</p>
                                        <p>Price: ${disc.discPrice}</p>
                                        <a href={disc.pageUrl}>More Info</a>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}