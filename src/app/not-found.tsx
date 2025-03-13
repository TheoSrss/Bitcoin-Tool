import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">404</h1>
          <p className="text-gray-500">OOOPPPSS !!! You&apos;re lost</p>
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-00/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}