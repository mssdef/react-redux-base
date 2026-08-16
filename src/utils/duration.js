export const parseDurationToSeconds = (duration) => {
  if (typeof duration === 'number') return duration;
  if (typeof duration === 'string') {
    const parts = duration.split(':').map(Number);
    if (parts.length === 2 && parts.every(n => !Number.isNaN(n))) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    }
  }
  return 0;
};
