import { masterData, type Product } from '@/data';
export type QuoteOptions = {
  quantity: number;
  size: string;
  dimensions: number[];
  material: number;
  finish: number;
  insert: number;
};
export type Quote =
  | { valid: false; error: string }
  | { valid: true; custom: boolean; quantity: number; unit: number | null; total: number | null };
export function calculateQuote(product: Product, options: QuoteOptions): Quote {
  const rules = masterData.quoteRules;
  const { quantity } = options;
  if (!Number.isInteger(quantity) || quantity < product.moq || quantity > rules.maxQuantity)
    return { valid: false, error: `Minimum ${product.moq} pcs, maksimum 100.000 pcs.` };
  const adjustments = [
    product.materials[options.material],
    product.finishes[options.finish],
    product.inserts[options.insert],
  ];
  if (
    ![options.material, options.finish, options.insert].every(Number.isInteger) ||
    adjustments.some((option) => !option)
  )
    return { valid: false, error: 'Pilih spesifikasi yang tersedia.' };
  if (options.size === 'custom') {
    if (
      options.dimensions.length !== (product.kind === 'calendar' ? 2 : 3) ||
      options.dimensions.some(
        (value) => !Number.isFinite(value) || value < 1 || value > rules.maxDimensionCm,
      )
    )
      return { valid: false, error: 'Isi setiap ukuran custom antara 1–200 cm.' };
    return { valid: true, custom: true, quantity, unit: null, total: null };
  }
  const factor = rules.sizeFactors[options.size as keyof typeof rules.sizeFactors];
  if (factor === undefined) return { valid: false, error: 'Pilih ukuran yang tersedia.' };
  const discount = rules.discounts.find((tier) => quantity >= tier.minimum)?.factor ?? 1;
  const unit =
    Math.round(
      ((product.price * factor + adjustments.reduce((sum, option) => sum + option.price, 0)) *
        discount) /
        rules.rounding,
    ) * rules.rounding;
  return { valid: true, custom: false, quantity, unit, total: unit * quantity };
}
