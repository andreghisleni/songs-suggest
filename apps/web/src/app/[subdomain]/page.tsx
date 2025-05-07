export default function Home({ params }: { params: { subdomain: string } }) {
  return (
    <div>
      <h1>Home {params.subdomain}</h1>
    </div>
  );
}
