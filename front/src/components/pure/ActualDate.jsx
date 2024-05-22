export default function ActualDate() {
  return (
    <div>{new Date().toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: '2-digit' })}</div>
  )
}
