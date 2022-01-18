import { useContext } from "react";
import { AppContext } from "../../Context/ContextProvider";
import FrontPageLogin from "./FrontPageLogin";
import FrontPageLogo from "./FrontPageLogo";
import FrontPageWelcome from "./FrontPageWelcome";

export default function FrontPageMain() {
  const { user, setUserNick, loading, userColor, setUserColor } = useContext(AppContext);
  return (
    <div className="front-page-container">
      <FrontPageLogo />
      {user ? (
        <FrontPageWelcome
          user={user}
          loading={loading}
          setUserNick={setUserNick}
          setUserColor={setUserColor}
          userColor={userColor}
        />
      ) : (
        <FrontPageLogin />
      )}
    </div>
  );
}
