export function scrollToElement(id: string, { focus = false }: { focus?: boolean } = {}) {
  const element = document.getElementById(id);
  if (!element) return;
  if (focus) element.focus({ preventScroll: true });
  element.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}
