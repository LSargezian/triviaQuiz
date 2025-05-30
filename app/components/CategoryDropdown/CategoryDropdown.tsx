import React from 'react';
import { useSelector } from 'react-redux';
import { setCategory } from '~/redux/reducers/quizSettingsSlice';
import { type RootState } from '~/redux/store/store';
import { useAppDispatch } from '~/redux/store/hooks';
import { useCategories } from '~/graphql/hooks/useCategories';
import type { CategoryDropdownProps } from '~/types';

function CategorySelect() {
    const dispatch = useAppDispatch();
    const selectedCategoryId = useSelector((state: RootState) => state.quizSettings.categoryId);

    const { categories, loading, error } = useCategories();

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = Number(event.target.value);
        dispatch(setCategory(categoryId));
    };

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories</p>;

    return (
        <div>
            <label htmlFor="category-select">Select a Category</label>
            <CategoryDropdown
                id="category-select"
                value={selectedCategoryId ?? ''}
                onChange={handleCategoryChange}
                options={categories}
            />
        </div>
    );
}

function CategoryDropdown({ id, value, onChange, options }: CategoryDropdownProps) {
    return (
        <select id={id} value={value} onChange={onChange}>
            <option value="" disabled>-- Select --</option>
            {options.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}

export default CategorySelect;
