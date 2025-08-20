import { useEffect, useState } from 'react'

export function useScrollAnimation() {
  const [animatedElements, setAnimatedElements] = useState<Set<Element>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            entry.target.classList.add('animate')
            setAnimatedElements(prev => new Set(prev).add(entry.target))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // 观察所有带有 animate-on-scroll 类的元素
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [animatedElements])

  return animatedElements
} 