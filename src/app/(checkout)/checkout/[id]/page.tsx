export default async function CheckoutPage({ params }: { params: { id: number } }) {
  return (
    <div>
      <h1>Checking out comic #{params.id}</h1>
    </div>
  );
}
