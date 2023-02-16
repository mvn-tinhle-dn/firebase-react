import { useUserAuth } from "../../Hooks/UserAuthContext";
export default function Account() {
  const { user } = useUserAuth();
  console.log(user);

  return (
    <div className="account">
      <h1 className="title-page">Account</h1>
      <div className="account-content flex">
        <div className="account-img">
          <img
            src={
              user.photoURL
                ? user.photoURL
                : "https://reqres.in/img/faces/2-image.jpg"
            }
            alt=""
            className="img-avatar"
          />
        </div>
        <div className="account-info">
          <h1>Hi {user?.displayName}</h1>
          <p>Email: {user?.email}</p>
          <p>Admin</p>
        </div>
      </div>
      <img src="" alt="" />
    </div>
  );
}
