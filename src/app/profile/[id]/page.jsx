export default function UserProfile({ params }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile</h1>
      <hr />
      <p className="text-5xl mt-8">Profile Page {params.id}</p>
    </div>
  );
}
