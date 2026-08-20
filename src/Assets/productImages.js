/**
 * Curated high-resolution image mappings for Shopping Cart products.
 * Replaces old/unreliable external URLs from mock API responses.
 */

export const NEW_PRODUCT_IMAGES = {
    1: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80", // Nothing phone 2
    2: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", // HP laptop
    3: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // Sennheiser
    4: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", // Fossil
    5: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", // Nikon D850
    6: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80", // FitBit Tracker
    7: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", // Samsung Tablet
    8: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80", // Ps5 console
    9: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", // Bose Earbuds
    10: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80", // jbl Speaker
};

export const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80";

/**
 * Returns the updated product object with the new image URL.
 * @param {Object} product - Product object from API
 * @returns {Object} Product with updated image_url
 */
export const enhanceProductWithNewImage = (product) => {
    if (!product) return product;
    
    const key = product.prd_id || parseInt(product.id, 10);
    const newImageUrl = NEW_PRODUCT_IMAGES[key] || DEFAULT_PRODUCT_IMAGE;
    
    return {
        ...product,
        image_url: newImageUrl
    };
};
