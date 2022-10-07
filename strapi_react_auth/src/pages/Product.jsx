import React, { useEffect } from 'react';
import { Grid } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { getProduct } from '../api';
import { setProduct } from '../store/productSlice';
import { product_dtos } from '../utils/product_dtos';



const Product = () => {

    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);
    console.log(product)

    const getProducts = async () => {
        try {
            const { data } = await getProduct();

            if (data.data) {

                const format_Product = product_dtos(data.data);
                dispatch(setProduct(format_Product));
            }

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <Layout>
            <div style={{ marginTop: "150px" }}>
                <Grid>
                    {
                        product.map((product) => (
                            <Grid.Col key={product.id} xs={6} sm={6} md={4}>
                                <h5>{product.product_name}</h5>
                                <p> $ {product.price}</p>
                            </Grid.Col>
                        ))
                    }

                </Grid>
            </div>
        </Layout>
    )
}

export default Product;
