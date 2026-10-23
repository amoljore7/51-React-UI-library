import { previewableTypePrefix } from './constants'

// Formats a browser can draw in an <img>, for when the MIME type is missing.
const previewableExtensions = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.avif',
  '.bmp',
  '.ico',
]

export const isPreviewableFile = file => {
  if (!(file instanceof File)) return false
  const type = file.type?.toLowerCase() || ''
  if (type) return type.startsWith(previewableTypePrefix)
  const name = file.name?.toLowerCase() || ''
  return previewableExtensions.some(extension => name.endsWith(extension))
}

export const matchesAccept = (file, accept) => {
  if (!accept) return true
  const name = file?.name?.toLowerCase() || ''
  const type = file?.type?.toLowerCase() || ''

  return accept
    .split(',')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean)
    .some(entry => {
      if (entry.startsWith('.')) return name.endsWith(entry)
      if (entry.endsWith('/*')) return type.startsWith(entry.slice(0, -1))
      return type === entry
    })
}
