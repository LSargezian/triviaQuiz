import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '~/graphql/operations/queries/getCategories';
import type { Category } from '~/types';

export const useCategories = () => {
    const { data, loading, error } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

    return {
        categories: data?.categories ?? [],
        loading,
        error,
    };
};
