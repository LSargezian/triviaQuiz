import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '~/graphql/queries';
import type {Category} from '~/types';

const CategoryList: React.FC = () => {
    const { loading, error, data } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {error.message}</p>;

    return (
        <ul>
            {data?.categories.map(cat => (
                <li key={cat.id}>{cat.name}</li>
            ))}
        </ul>
    );
};

export default CategoryList;
