import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct, SHIPPING_FEE } from '../data/products.js'

const STORAGE_KEY = 'stitch-hide-cart'

// 와이어프레임 P05 예시 두 줄로 시작합니다.
const INITIAL_ITEMS = [
  { productId: 'field-fit-infield', size: 11.5, throwHand: '오른손', qty: 1 },
  { productId: 'junior-fit', size: 10.5, throwHand: '오른손', qty: 1 },
]

const itemKey = (i) => `${i.productId}|${i.size}|${i.throwHand}`

function loadItems() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed.filter((i) => getProduct(i.productId))
    }
  } catch {
    /* 저장소를 쓸 수 없으면 기본값 */
  }
  return INITIAL_ITEMS
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* 무시 */
    }
  }, [items])

  const addItem = useCallback(({ productId, size, throwHand, qty = 1 }) => {
    setItems((prev) => {
      const key = itemKey({ productId, size, throwHand })
      const found = prev.find((i) => itemKey(i) === key)
      if (found) {
        return prev.map((i) => (itemKey(i) === key ? { ...i, qty: Math.min(i.qty + qty, 9) } : i))
      }
      return [...prev, { productId, size, throwHand, qty }]
    })
  }, [])

  const setQty = useCallback((key, qty) => {
    setItems((prev) => prev.map((i) => (itemKey(i) === key ? { ...i, qty } : i)))
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => itemKey(i) !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const lines = items.map((i) => {
      const product = getProduct(i.productId)
      return { ...i, key: itemKey(i), product, lineTotal: product.price * i.qty }
    })
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const shipping = lines.length ? SHIPPING_FEE : 0
    return {
      lines,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      setQty,
      removeItem,
      clear,
    }
  }, [items, addItem, setQty, removeItem, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}
