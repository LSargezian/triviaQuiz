// src/components/CategoryDropdown.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '~/graphql/queries';
import type { Category } from '~/types';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '~/redux/reducers/quizSettingsSlice';
import type {RootState} from '~/redux/store/store';
import {useAppDispatch} from "~/redux/store/hooks";

const CategoryDropdown: React.FC = () => {
    const dispatch = useAppDispatch();  // Use typed dispatch here
    const selectedCategory = useSelector((state: RootState) => state.quizSettings.categoryId);
    const { loading, error, data } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

    if (loading) return <p className="text-gray-500 text-sm">Loading categories...</p>;
    if (error) return <p className="text-red-500 text-sm">Error loading categories: {error.message}</p>;

    return (
        <div className="max-w-sm mx-auto">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Select a Category
            </label>
            <select
                id="category"
                value={selectedCategory ?? ''}
                onChange={(e) => dispatch(setCategory(Number(e.target.value)))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
            >
                <option value="" disabled>
                    -- Select --
                </option>
                {data?.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryDropdown;
