let activeScrollFrame: number | null = null;
let restoreScrollBehavior: (() => void) | null = null;

function stopActiveScroll() {
  if (activeScrollFrame !== null) cancelAnimationFrame(activeScrollFrame);
  activeScrollFrame = null;
  restoreScrollBehavior?.();
  restoreScrollBehavior = null;
}

export function slowScrollToId(id: string, reduceMotion = false) {
  const target = document.getElementById(id);
  if (!target) return;

  stopActiveScroll();

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;

  if (reduceMotion || Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY });
    window.history.replaceState(null, "", `#${id}`);
    return;
  }

  const rootScrollBehavior = document.documentElement.style.scrollBehavior;
  const bodyScrollBehavior = document.body.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  restoreScrollBehavior = () => {
    document.documentElement.style.scrollBehavior = rootScrollBehavior;
    document.body.style.scrollBehavior = bodyScrollBehavior;
  };

  const duration = Math.min(1450, Math.max(1050, Math.abs(distance) * 0.48));
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      activeScrollFrame = requestAnimationFrame(step);
    } else {
      activeScrollFrame = null;
      restoreScrollBehavior?.();
      restoreScrollBehavior = null;
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  activeScrollFrame = requestAnimationFrame(step);
}
