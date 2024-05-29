"use client";
import React, { useState, useEffect, useContext } from "react";
import { IWishlist } from "@/domain/IWishlist";
import WishlistService from "@/services/WishlistService";
import DiscsInWishlistService from "@/services/DiscsInWishlistService";
import { AppContext } from "@/state/AppContext";
import { useRouter } from "next/navigation";
import { IDiscFromPage } from "@/domain/IDiscFromPage";
import { handleDeleteFromWishlist } from "@/components/AddOrRemoveFromWishlist";
import AccountService from "@/services/AccountService";
import Image from 'next/image';

export default function Wishlist() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [wishlists, setWishlists] = useState<IWishlist[]>([]);
    const [discsInWishlist, setDiscsInWishlist] = useState<IDiscFromPage[]>([]);
    const { userInfo } = useContext(AppContext)!;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem("userData");
            if (!userData) {
                router.push("/routes/login");
                return;
            }
            const fetchData = async () => {
                await AccountService.isTokenExpired();
                try {
                    const wishlistResponse = await WishlistService.getAll();
                    if (wishlistResponse.data) {
                        setWishlists(wishlistResponse.data);
                        if (wishlistResponse.data.length > 0) {
                            const discsResponse = await DiscsInWishlistService.getAllDiscsInWishlistById();
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

    const handleDiscDeletion = async (discsInWishlistId: string) => {
        try {
            await handleDeleteFromWishlist(discsInWishlistId, updateDiscsInWishlist);
        } catch (error) {
            console.error("Error deleting disc from wishlist:", error);
        }
    };

    const updateDiscsInWishlist = (deletedDiscId: string) => {
        setDiscsInWishlist(prevDiscs => prevDiscs.filter(disc => disc.discsInWishlistId !== deletedDiscId));
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
                                        <button onClick={() => handleDiscDeletion(disc.discsInWishlistId)} className="round-button">Remove</button>
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
                    ))}
                </>
            )}
        </>
    );
}
