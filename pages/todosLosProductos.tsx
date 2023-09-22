import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/components/products/products/cart/contextCart/store/appHooks';
import Navbar from '@/app/components/navbar/navbar';
import Products from '@/app/components/products/products/products';
import { apiGetAllProducts } from '@/app/components/products/products/cart/contextCart/productManagement/productManagementSlice';

const TodosLosProductos: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(apiGetAllProducts());
    }, [dispatch]);

    const allProducts = useAppSelector((state) => state.productManagement.allProducts);

    return (
        <div>
            <Navbar />
            <h1>Lista de Todos los Productos</h1>
            <Products productList={allProducts} displayMode="both" />
        </div>
    );
}

export default TodosLosProductos;
