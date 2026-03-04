import {
    useVendorUserControllerFindById,
    useProductCategoryUserControllerFindAllActive,
    type BadRequestException,
    type vendorUserControllerFindByIdResponse,
    type productCategoryUserControllerFindAllActiveResponse,
} from "@/api/generated";
import type { ErrorType } from "@/api/mutator/custom-instance";
import { customInstance } from "@/api/mutator/custom-instance";

type UseRestaurantMenuReturn<
    TVendorData = vendorUserControllerFindByIdResponse,
    TVendorError = ErrorType<BadRequestException>,
    TCategoriesData = productCategoryUserControllerFindAllActiveResponse,
    TCategoriesError = ErrorType<BadRequestException | void>
> = {
    vendor: TVendorData | undefined;
    categories: TCategoriesData | undefined;
    isLoading: boolean;
    error: TVendorError | TCategoriesError | null | undefined;
    refetchVendor: () => void;
    refetchCategories: () => void;
};

type UseRestaurantMenuOptions = {
    enabled?: boolean;
    request?: Parameters<typeof customInstance>[1];
};

export const useRestaurantMenu = <
    TVendorData = vendorUserControllerFindByIdResponse,
    TVendorError = ErrorType<BadRequestException>,
    TCategoriesData = productCategoryUserControllerFindAllActiveResponse,
    TCategoriesError = ErrorType<BadRequestException | void>
>(
    vendorId: number,
    options?: UseRestaurantMenuOptions
): UseRestaurantMenuReturn<TVendorData, TVendorError, TCategoriesData, TCategoriesError> => {
    const enabled = options?.enabled ?? !!vendorId;

    const vendorQuery = useVendorUserControllerFindById<
        TVendorData,
        TVendorError
    >(vendorId, {
        query: {
            enabled,
        },
        ...(options?.request && { request: options.request }),
    });

    const categoriesQuery = useProductCategoryUserControllerFindAllActive<
        TCategoriesData,
        TCategoriesError
    >(
        vendorId,
        undefined,
        {
            query: {
                enabled,
            },
            ...(options?.request && { request: options.request }),
        }
    );

    return {
        vendor: vendorQuery.data,
        categories: categoriesQuery.data,

        isLoading: vendorQuery.isLoading || categoriesQuery.isLoading,

        error: vendorQuery.error || categoriesQuery.error,

        refetchVendor: vendorQuery.refetch,
        refetchCategories: categoriesQuery.refetch,
    };
};
