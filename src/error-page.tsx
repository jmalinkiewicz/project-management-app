import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex h-full flex-col justify-center gap-8 text-center">
      <h1 className="text-7xl font-bold">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-3xl font-bold">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
