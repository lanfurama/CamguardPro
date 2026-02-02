import { useState, useCallback, useEffect } from 'react';
import { brandsApi } from '../services/api';

export function useBrands() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await brandsApi.getAll();
      const data: string[] = Array.isArray(raw)
        ? raw
        : (raw && typeof raw === 'object' && Array.isArray((raw as { brands?: unknown }).brands)
          ? (raw as { brands: string[] }).brands
          : []);
      setBrands(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không tải được danh sách hãng';
      setError(msg);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleAddBrand = useCallback(async (brand: string) => {
    if (!brand.trim() || brands.includes(brand.trim())) return;
    try {
      const updated = await brandsApi.add(brand.trim());
      setBrands(updated);
    } catch (err) {
      console.error('Lỗi thêm hãng:', err);
    }
  }, [brands]);

  const handleDeleteBrand = useCallback(async (brand: string) => {
    try {
      await brandsApi.delete(brand);
      setBrands((prev) => prev.filter((b) => b !== brand));
    } catch (err) {
      console.error('Lỗi xoá hãng:', err);
    }
  }, []);

  return {
    brands,
    loading,
    error,
    refetch: fetchBrands,
    handleAddBrand,
    handleDeleteBrand,
  };
}
