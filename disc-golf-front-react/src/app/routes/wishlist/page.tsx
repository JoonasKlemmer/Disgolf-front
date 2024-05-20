"use client";
import React, { useState, useEffect, useContext } from "react";
import { IWishlist } from "@/domain/IWishlist";
import WishlistService from "@/services/WishlistService";
import DiscsInWishlistService from "@/services/DiscsInWishlistService";
import { AppContext } from "@/state/AppContext";
import { useRouter } from "next/navigation";
import { IDiscFromPage } from "@/domain/IDiscFromPage";

export default function Wishlist() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [wishlists, setWishlists] = useState<IWishlist[]>([]);
    const [selectedWishlist, setSelectedWishlist] = useState<string | null>(null);
    const [discsInWishlist, setDiscsInWishlist] = useState<IDiscFromPage[]>([]);
    const { userInfo } = useContext(AppContext)!;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem("userData");
            if(!userData){
                router.push("/routes/login");
                return;
            }
            const fetchData = async () => {
                try {
                    let item = JSON.parse(localStorage.getItem("userData")!);
                    const wishlistResponse = await WishlistService.getAll(item.jwt);
                    if (wishlistResponse.data) {
                        setWishlists(wishlistResponse.data);
                        if (wishlistResponse.data.length > 0) {
                            const discsResponse = await DiscsInWishlistService.getAllDiscsInWishlistById(item.jwt);
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
        }
    }, [userInfo, router]);

    const handleDeleteFromWishlist = async (discsInWishlistId: string) => {
        try {
            await DiscsInWishlistService.deleteFromWishlist(userInfo!.jwt, discsInWishlistId);
            // Update discs in the wishlist after deletion
            const updatedDiscsResponse = await DiscsInWishlistService.getAllDiscsInWishlistById(userInfo!.jwt);
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
                                        <h2>{disc.name}</h2>
                                        <p>{disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}</p>
                                        <p>{disc.manufacturerName}</p>
                                        <p>{disc.categoryName}</p>
                                        <p>{disc.discPrice}</p>
                                        <p>{disc.pageUrl}</p>
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
