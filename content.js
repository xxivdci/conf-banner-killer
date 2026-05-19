(() => {
  "use strict";

  const TARGET_TEXTS = [
    'Confidencialidade" label was applied to this file',
    'Confidentiality" label was applied to this file',
    "label was applied to this file",
  ].map((s) => s.toLowerCase());

  const textMatches = (el) => {
    const t = (el.textContent || "").toLowerCase();
    return TARGET_TEXTS.some((x) => t.includes(x));
  };

  // Key change: find the nearest ancestor that actually has the Close button inside it
  const findDismissableBannerRoot = (node) => {
    let cur = node;
    for (let i = 0; i < 20 && cur; i++) {
      if (cur.nodeType === 1) {
        if (cur.querySelector?.('[aria-label="Close banner"]')) return cur;
      }
      cur = cur.parentElement;
    }
    return null;
  };

  const dismiss = (root) => {
    if (!root || root.dataset.__gwDismissed) return false;
    root.dataset.__gwDismissed = "1";

    const btn = root.querySelector('[aria-label="Close banner"]');
    if (!btn) return false;

    try {
      btn.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      btn.dispatchEvent(
        new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      btn.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      return true;
    } catch {}
    return false;
  };

  const scan = () => {
    // Use a narrower candidate set to avoid heavy scans
    const candidates = document.querySelectorAll("div,span,section,aside");
    for (const el of candidates) {
      if (!textMatches(el)) continue;

      const root = findDismissableBannerRoot(el);
      if (dismiss(root)) {
        // optional: stop after first success per scan
        // break;
      }
    }
  };

  scan();

  const mo = new MutationObserver(() => scan());
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // periodic rescan for re-renders that don't trigger observer reliably
  setInterval(scan, 1500);
})();
