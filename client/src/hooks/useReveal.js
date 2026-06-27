import { useEffect } from "react";

export const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -48px 0px" }
    );

    const observeRevealElements = () => {
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((element) => {
        observer.observe(element);
      });
    };

    observeRevealElements();

    const mutationObserver = new MutationObserver(observeRevealElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};
