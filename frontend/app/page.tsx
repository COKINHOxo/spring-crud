"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, Star } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { ProductForm } from "./components/product-form"
import type { Product } from "@/app/types/productType"
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "@/app/services/productService"

export default function ProductCRUD() {
  /** ---- Estados de controle ------------------------------------------------ */
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  /** ---- Carrega produtos ao montar ---------------------------------------- */
  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getAllProducts()
        console.log("Produtos da API:", data);
        setProducts(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [])

  /** ---- CRUD --------------------------------------------------------------- */
 type ProductPayload = Omit<Product, "id">

const handleCreateProduct = (data: ProductPayload): void => {
  createProduct(data)
    .then((newProduct) => {
      setProducts((prev) => [...prev, newProduct])
      setIsCreateDialogOpen(false)
    })
    .catch((err) => alert(err.message))
}

const handleEditProduct = (data: ProductPayload): void => {
  if (!selectedProduct) return
  const id = selectedProduct.id

  updateProduct(id, data)
    .then((updated) => {
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
      setIsEditDialogOpen(false)
      setSelectedProduct(null)
    })
    .catch((err) => alert(err.message))
}

const handleDeleteProduct = (): void => {
  if (!productToDelete) return
  const id = productToDelete.id
  if (!productToDelete) return
  console.log("Produto para deletar:", productToDelete)

  deleteProduct(id)
    .then(() => {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    })
    .catch((err) => alert(err.message))
}

  /** ---- Filtros, formatação e helpers ------------------------------------- */
 const filteredProducts = products.filter((p) => {
  const search = searchTerm.toLowerCase();
  return (
    p.name.toLowerCase().includes(search) ||
    (p.category?.toLowerCase().includes(search) ?? false) ||
    (p.description?.toLowerCase().includes(search) ?? false)
  );
});

  const formatPrice = (price: number, discount: number) => {
    const discountedPrice = price - (price * discount) / 100
    return {
      original: price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      discounted: discountedPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    }
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))

  /** ---- UI principal ------------------------------------------------------- */
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Cabeçalho e botão “Novo Produto” */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Produtos</h1>
          <p className="text-muted-foreground">
            {loading ? "Carregando produtos..." : "Gerencie seu catálogo de produtos de forma simples e eficiente"}
          </p>
          {error && <p className="text-destructive">{error}</p>}
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Produto</DialogTitle>
              <DialogDescription>Preencha as informações do produto abaixo</DialogDescription>
            </DialogHeader>
            <ProductForm onSubmit={handleCreateProduct} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de produtos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Produtos ({filteredProducts.length})</span>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Imagem</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Avaliação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const prices = formatPrice(product.price, product.discount)
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{product.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {product.discount > 0 ? (
                            <>
                              <div className="text-sm line-through text-muted-foreground">{prices.original}</div>
                              <div className="font-medium text-green-600">{prices.discounted}</div>
                              <Badge variant="destructive" className="text-xs">
                                -{product.discount}%
                              </Badge>
                            </>
                          ) : (
                            <div className="font-medium">{prices.original}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${
                            product.quantityInStock < 10
                              ? "text-red-600"
                              : product.quantityInStock < 20
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {product.quantityInStock} un.
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating ?? 0)}
                          <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.active ? "default" : "secondary"}>
                          {product.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => { setSelectedProduct(product); setIsEditDialogOpen(true) }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => { setProductToDelete(product);console.log("Produto clicado para deletar:", product); setIsDeleteDialogOpen(true) }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Editar */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>Modifique as informações do produto</DialogDescription>
          </DialogHeader>
          {selectedProduct && <ProductForm initialData={selectedProduct} onSubmit={handleEditProduct} />}
        </DialogContent>
      </Dialog>

      {/* Excluir */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{productToDelete?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
