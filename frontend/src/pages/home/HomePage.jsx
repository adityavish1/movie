import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreenOne from "./HomeScreenOne";

const HomePage = () => {
	const { user } = useAuthStore();

	return <>{user ? <HomeScreenOne /> : <AuthScreen />}</>;
};
export default HomePage;