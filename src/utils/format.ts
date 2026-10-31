const rupiah = new Intl.NumberFormat('id-ID');
export function formatPrice(value: number) {
  return `Rp ${rupiah.format(value)}`;
}
