
import {publicRequest} from '../requestMethods'
import { createAsyncThunk } from '@reduxjs/toolkit';

//get all products  
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async ({role,category,color, strap, sortType}) => {
        try{

            let link = ""
            switch(role){
                case "newProduct":
                    link  = "/products";
                    break;
                case "category":
                    if (category){
                        if (color){
                            if (strap){
                                link = `/products?category=${category}&color=${color}&strap=${strap}`;
                            }
                            else{
                                link = `/products?category=${category}&color=${color}`;
                            }
                        }
                        else{
                            if (strap){
                                link = `/products?category=${category}&strap=${strap}`;
                            }
                            else{
                                link = `/products?category=${category}`;
                            }
                        }   
                    }
                    else{
                        if (color){
                            if (strap){
                                link = `/products?color=${color}&strap=${strap}`;
                            }
                            else{
                                link = `/products?color=${color}`;
                            }
                        }
                        else{
                            if (strap){
                                link = `/products?strap=${strap}`;
                            }
                            else{
                                link = `/products`;
                            }
                        }           
                    }
                    break;
                default:
                    link = "/products"
                    break;
            }
            const {data} = await publicRequest.get(link);


            if (sortType === "newest"){
                const newProducts = data.products.sort((a,b)=> b.createAt - a.createAt)
                data.products = newProducts
                
            }
            else if (sortType ===  "price-asc"){
                const newProducts = data.products.sort((a,b)=> a.price - b.price)
                data.products = newProducts
               
            }
            else if (sortType ===  "price-desc") {
                const newProducts = data.products.sort((a,b)=> b.price - a.price)
                data.products = newProducts
                
            }

            return data

        
           
        }catch(err){
            return err.response.data.message
        }
    }
)


//get  product detail 
export const getProductDetail = createAsyncThunk(
    "product/getProductDetail",
    async (id) => {
        // try{
            const { data } = await publicRequest.get(
                `/product/${id}`
            );
            return data.product
        // }catch(err){
        //     return err.response.data.message
        // }
    }
)

//admin
export const getProductAdmin = createAsyncThunk(
    "pruduct/getProductAdmin",
    async () => {
        try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const { data } = await publicRequest.get(
                "/admin/products",
                config,
            );

            return data
        }
        catch(err){
            return err.response.data.message
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (productData)=>{
        try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const { data } = await publicRequest.put(
                `admin/product/${productData[0]}`,
                productData[1],
                config
              );
            return data.success
        }catch(err){
            return err.response.data.message
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "'product/deleteProduct",
    async (id) => {
        try{
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization : `Bearer ${token}`  } }; 
            const {data} = await publicRequest.delete(
                `/admin/product/${id}`,
                config
            );
            return data.success
        }catch(err){
            return err.response.data.message
        }
    }
)