import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow fixed top-0 w-full z-40">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center justify-center">
        {/* <img src="/logo.jpg" width={60}  alt="" /> */}
          AI Career Guide
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-500">Home</Link>
          <Link to="/results" className="hover:text-indigo-500">Jobs</Link>
          <Link to="/insights" className="hover:text-indigo-500">Insights</Link>
        </div>
      </nav>
    </header>
  );
}