import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // ⭐ FIX 1: Use 'accessToken' to match your other files
      // ⭐ FIX 2: Add "Bearer " right here so you don't have to add it in every API call
      localStorage.setItem('accessToken', `Bearer ${token}`); 
      navigate('/googleuserpage', { replace: true });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Logging you in...</h2>
    </div>
  );
}

export default AuthCallback;