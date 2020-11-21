function msToTime(duration: number) {
  let minutes: string | number = parseInt(
    String((+duration / (1000 * 60)) % 60),
    10
  );
  let hours: string | number = parseInt(
    String((duration / (1000 * 60 * 60)) % 24),
    10
  );

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
}

const dateTimeParseToTime = (str: string): string => {
  if (str.length === 0) return '';
  return msToTime(+Date.parse(str));
};

export default dateTimeParseToTime;
