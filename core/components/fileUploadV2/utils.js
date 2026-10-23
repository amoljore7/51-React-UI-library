import { previewableTypePrefix } from './constants';

// Formats a browser can draw in an <img>, for when the MIME type is missing.
const previewableExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.bmp', '.ico'];
export const isPreviewableFile = file => {
  var _file$type, _file$name;
  if (!(file instanceof File)) return false;
  const type = ((_file$type = file.type) === null || _file$type === void 0 ? void 0 : _file$type.toLowerCase()) || '';
  if (type) return type.startsWith(previewableTypePrefix);
  const name = ((_file$name = file.name) === null || _file$name === void 0 ? void 0 : _file$name.toLowerCase()) || '';
  return previewableExtensions.some(extension => name.endsWith(extension));
};
export const matchesAccept = (file, accept) => {
  var _file$name2, _file$type2;
  if (!accept) return true;
  const name = (file === null || file === void 0 || (_file$name2 = file.name) === null || _file$name2 === void 0 ? void 0 : _file$name2.toLowerCase()) || '';
  const type = (file === null || file === void 0 || (_file$type2 = file.type) === null || _file$type2 === void 0 ? void 0 : _file$type2.toLowerCase()) || '';
  return accept.split(',').map(entry => entry.trim().toLowerCase()).filter(Boolean).some(entry => {
    if (entry.startsWith('.')) return name.endsWith(entry);
    if (entry.endsWith('/*')) return type.startsWith(entry.slice(0, -1));
    return type === entry;
  });
};