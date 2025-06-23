"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "../types/productType" 

interface ProductFormProps {
  initialData?: Product
  onSubmit: (product: Omit<Product, "id">) => void
}

const categories = [
  "Eletrônicos",
  "Computadores",
  "Áudio",
  "Casa e Jardim",
  "Roupas",
  "Esportes",
  "Livros",
  "Beleza",
  "Automóveis",
  "Outros",
]

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantityInStock: "",
    releaseDate: "",
    rating: "",
    active: true,
    imageUrl: "",
    discount: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price.toString(),
        category: initialData.category,
        quantityInStock: initialData.quantityInStock.toString(),
        releaseDate: initialData.releaseDate,
        rating: initialData.rating?.toString() ?? "",
        active: initialData.active,
        imageUrl: initialData.imageUrl ?? "",
        discount: initialData.discount.toString(),
      })
    }
  }, [initialData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Preço deve ser maior que zero"
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória"
    }

    if (!formData.quantityInStock || Number.parseInt(formData.quantityInStock) < 0) {
      newErrors.quantityInStock = "Quantidade deve ser maior ou igual a zero"
    }

    if (!formData.releaseDate) {
      newErrors.releaseDate = "Data de lançamento é obrigatória"
    }

    if (!formData.rating || Number.parseFloat(formData.rating) < 0 || Number.parseFloat(formData.rating) > 5) {
      newErrors.rating = "Avaliação deve estar entre 0 e 5"
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "URL da imagem é obrigatória"
    }

    if (Number.parseFloat(formData.discount) < 0 || Number.parseFloat(formData.discount) > 100) {
      newErrors.discount = "Desconto deve estar entre 0 e 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const productData: Omit<Product, "id"> = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number.parseFloat(formData.price),
      category: formData.category,
      quantityInStock: Number.parseInt(formData.quantityInStock),
      releaseDate: formData.releaseDate,
      rating: Number.parseFloat(formData.rating),
      active: formData.active,
      imageUrl: formData.imageUrl.trim(),
      discount: Number.parseFloat(formData.discount) || 0,
    }

    onSubmit(productData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Digite o nome do produto"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Descreva o produto"
          rows={3}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            placeholder="0.00"
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount">Desconto (%)</Label>
          <Input
            id="discount"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={formData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
            placeholder="0.0"
          />
          {errors.discount && <p className="text-sm text-red-500">{errors.discount}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantityInStock">Quantidade em Estoque *</Label>
          <Input
            id="quantityInStock"
            type="number"
            min="0"
            value={formData.quantityInStock}
            onChange={(e) => handleInputChange("quantityInStock", e.target.value)}
            placeholder="0"
          />
          {errors.quantityInStock && <p className="text-sm text-red-500">{errors.quantityInStock}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Data de Lançamento *</Label>
          <Input
            id="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={(e) => handleInputChange("releaseDate", e.target.value)}
          />
          {errors.releaseDate && <p className="text-sm text-red-500">{errors.releaseDate}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Avaliação (0-5) *</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => handleInputChange("rating", e.target.value)}
            placeholder="0.0"
          />
          {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da Imagem *</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => handleInputChange("imageUrl", e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) => handleInputChange("active", checked)}
        />
        <Label htmlFor="active">Produto Ativo</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">{initialData ? "Atualizar Produto" : "Criar Produto"}</Button>
      </div>
    </form>
  )
}
