export function formatTime(dateTime) {
  return `${dateTime.split('T')[0]} ${dateTime.split('T')[1].split('\.')[0]}`
}
