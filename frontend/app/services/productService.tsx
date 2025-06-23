import type { Product } from "../types/productType";
export type ProductInput = Omit<Product, "id">;

export const getAllProducts = async(): Promise<Product[]> => {
  const res = await fetch("http://localhost:8080/api/products");
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export const getProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`http://localhost:8080/api/products/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar produto");
  return res.json();
};

export const createProduct = async (data: ProductInput): Promise<Product> => {
    const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Falha ao criar novo produto");
    return res.json();
}

export const updateProduct = async (id: number, data: ProductInput): Promise<Product> => {
    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })

    if(!res.ok) throw new Error("Erro ao atualizar produto");

    return res.json() as Promise<Product>
    
}

export const deleteProduct = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
    })
    if (res.status !== 204) throw new Error("Esperado status 204 ao deletar");
}