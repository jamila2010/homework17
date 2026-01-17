import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div className='flex justify-center min-h-screen w-screen bg-[url("https://c7.alamy.com/comp/T6KGFE/404-error-page-not-found-vector-plug-graphic-background-T6KGFE.jpg")] bg-cover'>
     <div className="flex flex-col items-center justify-center gap-6">
       <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-4xl font-semibold text-black/50">Oops, This Page Fot Found</h2>
      <h3 className="text-xl">The link might be corrupted,</h3>
      <p>or the page may have been removed.</p>
      <button className="cursor-pointer rounded bg-black px-3 py-px text-white">
        {" "}
        <NavLink to={"/"}>GO BACK HOME</NavLink>{" "}
      </button>
     </div>
    </div>
  );
}

export default ErrorPage;
