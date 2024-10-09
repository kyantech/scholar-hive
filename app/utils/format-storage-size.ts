export function formatStorageSize(sizeInMB: number): string {
  const units = ['MB', 'GB', 'TB'];
  let size = sizeInMB;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
