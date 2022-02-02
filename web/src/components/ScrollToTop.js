import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function ScrollToTop() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const unlisten = navigate.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);

    return null;
}

export default ScrollToTop;