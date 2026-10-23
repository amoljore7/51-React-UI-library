import '@testing-library/jest-dom/vitest';

// jsdom implements neither, and FileUploadV2 previews a locally picked File through them.
if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = () => 'blob:mock-object-url';
  URL.revokeObjectURL = () => {};
}
