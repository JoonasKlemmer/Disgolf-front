import Link from "next/link";
import Identity from "./Identity";

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <Link href="/" className="navbar-brand">Discgolf</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link href="/routes/search" className="nav-link text-dark">Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/routes/wishlist" className="nav-link text-dark">Wishlist</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/routes/compare" className="nav-link text-dark">Compare</Link>
                            </li>

                        </ul>
                        <Identity />
                    </div>
                </div>
            </nav>
        </header>
    );
}
