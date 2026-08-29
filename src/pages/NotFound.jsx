import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 fw-bold">404</h1>
      <h2>Page Not Found</h2>
      <p className="text-secondary mt-3">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/dashboard"
        className="btn btn-primary mt-3"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;