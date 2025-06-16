import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component scrolls to the top when the route changes.
// otherwise it would remain in the position of the previous view. 
// Investigate more about this React behavior :D  

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default ScrollToTop;

