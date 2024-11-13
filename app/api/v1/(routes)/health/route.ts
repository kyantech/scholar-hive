import os from 'os';

import { successResponse } from '@/api/v1/lib/responses';

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;

  return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
}

function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export async function GET() {
  const uptime = process.uptime();

  const healthInfo = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    system: {
      platform: os.platform(),
      arch: os.arch(),
      version: os.version(),
      totalMemory: formatBytes(os.totalmem()),
      freeMemory: formatBytes(os.freemem()),
      loadAverage: os.loadavg(),
    },
    process: {
      uptime: {
        seconds: uptime,
        formatted: formatUptime(uptime),
      },
      nodeVersion: process.version,
      pid: process.pid,
      memoryUsage: formatBytes(process.memoryUsage().heapUsed),
    },
  };

  return successResponse(healthInfo);
}
