"use client"
import WishlistService from "@/services/WishlistService";
import DiscsInWishlistService from "@/services/DiscsInWishlistService";
import { IDiscFromPage } from "@/domain/IDiscFromPage";
import AccountService from "@/services/AccountService";





export const handleDeleteFromWishlist = async (discsInWishlistId:string , updateStateCallback:(deletedDiscId: string) => void) => {
    try {
        await AccountService.isTokenExpired();
        await DiscsInWishlistService.deleteFromWishlist(discsInWishlistId);
        updateStateCallback(discsInWishlistId);
    } catch (error) {
        console.error("Error deleting from wishlist:", error);
    }
};




export const handleAddToWishlist = async (discFromPage: IDiscFromPage) => {
    try {
        await AccountService.isTokenExpired();
        let response = await DiscsInWishlistService.discAlreadyInWishlist(discFromPage.discFromPageId);
        if (response.data === false) {
            const wishlistResponse = await WishlistService.getAll();


            if (wishlistResponse.data && wishlistResponse.data.length > 0) {
                const wishlistId = wishlistResponse.data[0].id;
                await DiscsInWishlistService.addDiscToWishlist(wishlistId, discFromPage.discFromPageId);
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

