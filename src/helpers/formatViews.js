// Helper para formatar visualizações em pt-BR: bilhões, milhões, mil, ou número abaixo de mil
export default function formatViews(num) {
  const n = Number(num) || 0;
  const formatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 0 });
  if (n >= 1e9) return `${formatter.format(n / 1e9)} bilhões`;
  if (n >= 1e6) return `${formatter.format(n / 1e6)} milhões`;
  if (n >= 1e3) return `${formatter.format(n / 1e3)} mil`;
  return new Intl.NumberFormat('pt-BR').format(n);
}
