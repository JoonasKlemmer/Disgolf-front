"use client"

import WishlistService from "@/services/WishlistService";
import DiscsInWishlistService from "@/services/DiscsInWishlistService";
import { IDiscFromPage } from "@/domain/IDiscFromPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";





export const handleAddToWishlist = async (jwt: string, discFromPage: IDiscFromPage) => {
    try {
        let response = await DiscsInWishlistService.discAlreadyInWishlist(jwt, discFromPage.discFromPageId);
        if (response.data === false) {
            const wishlistResponse = await WishlistService.getAll(jwt);


            if (wishlistResponse.data && wishlistResponse.data.length > 0) {
                const wishlistId = wishlistResponse.data[0].id;
                await DiscsInWishlistService.addDiscToWishlist(jwt, wishlistId, discFromPage.discFromPageId);
            } else {
                console.log("No wishlist found for the user.");
            }
        }else{
            alert("This disc is already in the wishlist.");
        }

    } catch (error) {
        console.error("Error fetching wishlist:", error);
    }
};

