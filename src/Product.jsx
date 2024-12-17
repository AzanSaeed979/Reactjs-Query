import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${productId}`,
        newProduct
      );
    },
  });

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  // Use useQuery to fetch product data
  const { isLoading, error, data } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
  });

  // Loading state
  if (isLoading) {
    return (
      <h1 style={{ textAlign: "center" }}>Please Wait, Data is Loading!</h1>
    );
  }

  // Error state
  if (error) {
    return (
      <h1 style={{ textAlign: "center", color: "purple" }}>
        Error: No Result Found!
      </h1>
    );
  }

  // Render product details
  return (
    <div>
      <h1>Product Details</h1>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>Price: ${data.price}</p>
      <p>Category: {data.category}</p>
      <img src={data.thumbnail} alt={data.title} width="300" />
      <button
        onClick={() => {
          mutation.mutate({ title: "Updated Product" });
        }}
      >
        Update Product
      </button>
    </div>
  );
};

export default Product;
