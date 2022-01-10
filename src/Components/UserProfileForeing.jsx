import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UserProfileForeing() {
  const images = require.context("../imgs", true);
  const params = useParams();
  const { usernickname } = params;
  console.log(params);
  return (
    <div className="dev-united-app">
      <div className="user-profile">
        <Link to="/">
          <div className="user-profile-back">
            <img
              className="user-profile-back-icon"
              src={images("./back.svg").default}
              alt=""
            />
            <p className="user-profile-name">{usernickname}</p>
          </div>
        </Link>
      </div>
      <div className="App-form-container">
      <div className="form-container">
        <img
          className="user-profile-dashboard-photo"
        //   style={{ outline: `5px solid ${userColor.hex}` }}
        //   src={user.photoURL}
          alt=""
        />
        <p
          className="user-profile-dashboard-name"
        //   style={{ backgroundColor: `${userColor.hex}` }}
        >
          {usernickname}
        </p>
      </div>
    </div>
    </div>
  );
}
