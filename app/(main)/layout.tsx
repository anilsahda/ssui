import Link from "next/link";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand fw-bold fs-4">🌐 SS App</Link>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-controls="navbarNav" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link href="/" className="nav-link px-3 fw-semibold">Home</Link></li>
              <li className="nav-item"><Link href="/about" className="nav-link px-3 fw-semibold">About</Link></li>
              <li className="nav-item"><Link href="/product" className="nav-link px-3 fw-semibold">Products</Link></li>
              <li className="nav-item"><Link href="/feedback" className="nav-link px-3 fw-semibold">Feedback</Link></li>              
              <li className="nav-item"><Link href="/contact" className="nav-link px-3 fw-semibold">Contact Us</Link></li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              <Link href="/login" className="btn btn-light btn-sm rounded-pill px-3 fw-bold">Login</Link>
              <Link href="/register" className="btn btn-outline-light btn-sm rounded-pill px-3 fw-bold">Register</Link>
              <a href="#" className="btn btn-light btn-sm rounded-circle d-flex text-danger"><FaGoogle /></a>
              <a href="#" className="btn btn-light btn-sm rounded-circle d-flex text-primary"><FaFacebook /></a>
              <a href="#" className="btn btn-light btn-sm rounded-circle d-flex text-primary"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mt-4">{children}</main>
    </div>
  );
}