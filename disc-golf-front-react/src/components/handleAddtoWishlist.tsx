import { IDisc } from "@/domain/IDisc";
import WishlistService from "@/services/WishlistService";
import DiscsInWishlistService from "@/services/DiscsInWishlistService";


export const handleAddToWishlist = async (jwt:string, disc: IDisc) => {
    try {
        const wishlistResponse = await WishlistService.getAll(jwt);
        if (wishlistResponse.data && wishlistResponse.data.length > 0) {
            const wishlistId = wishlistResponse.data[0].id;
            await DiscsInWishlistService.addDiscToWishlist(jwt, wishlistId, disc.discFromPageId);
        } else {
            console.log("No wishlist found for the user.");
        }
    } catch (error) {
        console.error("Error fetching wishlist:", error);
    }
};
