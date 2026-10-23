import { DEFAULT_DURATION } from './constants'

// Registered Toaster components — notified on every state change
const listeners = new Set()
// Single source of truth for all active toasts
let toasts = []
// Tracks auto-dismiss timers keyed by toast id
const timers = new Map()

export const toaster = {
  create(opts) {
    // Fall back to a UUID so callers can omit id when deduplication isn't needed
    const id = opts.id ?? crypto.randomUUID()
    const existing = toasts.findIndex(t => t.id === id)

    if (existing >= 0) {
      // Same id already visible — reset its timer and update content in-place
      clearTimeout(timers.get(id))
      timers.delete(id)
      toasts = [
        ...toasts.slice(0, existing),
        { ...opts, id },
        ...toasts.slice(existing + 1),
      ]
    } else {
      // New toast — append to the end (Toaster slices from the tail for maxVisible)
      toasts = [...toasts, { ...opts, id }]
    }

    // Explicit null duration means the toast must be dismissed manually
    const duration = opts.duration !== undefined ? opts.duration : DEFAULT_DURATION

    if (duration !== null) {
      timers.set(id, setTimeout(() => toaster.dismiss(id), duration))
    }

    // Broadcast updated list to all subscribed Toaster instances
    listeners.forEach(fn => fn([...toasts]))
    return id
  },

  dismiss(id) {
    if (id !== undefined) {
      // Targeted dismiss — clear only this toast's timer and remove it
      clearTimeout(timers.get(id))
      timers.delete(id)
      toasts = toasts.filter(t => t.id !== id)
    } else {
      // No id — dismiss all toasts at once
      timers.forEach(t => clearTimeout(t))
      timers.clear()
      toasts = []
    }
    listeners.forEach(fn => fn([...toasts]))
  },
}

export const subscribeToasts = fn => {
  listeners.add(fn)
  // Immediately call with current state so the subscriber doesn't start empty
  fn([...toasts])
  // Return an unsubscribe function for useEffect cleanup
  return () => listeners.delete(fn)
}
