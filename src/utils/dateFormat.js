export function msToTime(duration) {
  let minutes = parseInt(String((+duration / (1000 * 60)) % 60), 10);
  let hours = parseInt(String((duration / (1000 * 60 * 60)) % 24), 10);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
}

const dateTimeParseToTime = (str) => {
  if (str.length === 0) return '';
  return msToTime(+Date.parse(str));
};

export function mToMs(duration) {
  let seconds = parseInt(String((duration / 1000) % 60), 10);
  let minutes = parseInt(String((duration / (1000 * 60)) % 60), 10);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

export const msToSeconds = (duration) =>
  parseInt(String((duration / 1000) % 60), 10);

export function secondsToMs(duration) {
  const d = +duration;
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const minutes = m < 10 ? `0${m}` : m;
  const seconds = s < 10 ? `0${s}` : s;
  return `${minutes}:${seconds}`;
}

export default dateTimeParseToTime;
