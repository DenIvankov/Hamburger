import {
    useVendorUserControllerFindNearest,
    useProductControllerFindDiscountedByVendor,
} from "@/api/generated";

export const useNearestVendoruseNearestVendor = () => {
    // 1️⃣ получаем ближайшего продавца
    const nearestVendorQuery = useVendorUserControllerFindNearest();

    const vendorId = nearestVendorQuery.data?.data?.id ?? 6;

    // 2️⃣ получаем товары (запрос включается только когда vendor готов)
    const discountedProductsQuery =
        useProductControllerFindDiscountedByVendor(
            vendorId,
            undefined,
            {
                query: {
                    enabled: !!nearestVendorQuery.data,
                },
            }
        );

    // 3️⃣ объединяем состояние
    return {
        vendor: nearestVendorQuery.data,
        products: discountedProductsQuery.data,

        isLoading:
            nearestVendorQuery.isLoading ||
            discountedProductsQuery.isLoading,

        error:
            nearestVendorQuery.error ||
            discountedProductsQuery.error,

        refetchVendor: nearestVendorQuery.refetch,
        refetchProducts: discountedProductsQuery.refetch,
    };
};