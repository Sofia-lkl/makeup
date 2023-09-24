import React from 'react';
import Navbar from '@/app/components/navbar/navbar/navbar';
import Products from '@/app/components/products/products/products/products';

const TodosLosProductos: React.FC = () => {
    return (
        <div>
            <Navbar />
            <h1>Lista de Todos los Productos</h1>
            <Products displayMode="both" />
        </div>
    );
}

export default TodosLosProductos;
