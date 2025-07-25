import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png'; // Ensure the path is correct

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-transparent text-white z-10 absolute top-0 left-0 w-full">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="MovieApp Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold whitespace-nowrap">MovieApp</span>
      </Link>

      <div className="space-x-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-400 text-lg font-semibold transition-colors duration-200">Login</Link>
            <Link to="/signup" className="hover:text-indigo-400 text-lg font-semibold transition-colors duration-200">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
