export default (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', {month: 'long', day: 'numeric', year: 'numeric'})
}