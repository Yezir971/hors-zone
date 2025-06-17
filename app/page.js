import Link from "next/link";


export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="flex container m-6 gap-1.5">
      <Link className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md transition' href="/login">
        Se connecter
      </Link>
      <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-md transition' href="/signup">
        S'inscrire
      </Link>
    </div>
  );
}
