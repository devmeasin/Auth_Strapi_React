export const product_dtos = (data) => {

    const format_Product = data?.map((product) => {
        return {
            id: product.id,
            slug: product.attributes.slug,
            product_name: product.attributes.product_name,
            description: product.attributes.discription,
            price: product.attributes.price,
            product_images: product.attributes.product_images.data[0].attributes.url
        }
    });

    return format_Product;
}