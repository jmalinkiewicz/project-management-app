export default function Root() {
  return (
    <main className="mt-24 flex flex-col gap-16 pl-8 lg:pl-24">
      <h1 className="text-5xl font-bold">Hello!</h1>
      <div>
        <button className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
          Create Project
        </button>
      </div>
    </main>
  );
}
