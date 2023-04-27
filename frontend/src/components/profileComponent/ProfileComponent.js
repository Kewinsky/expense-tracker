import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const ProfileComponent = ({ currentUser }) => {
  return (
    <div>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <Link className="link-dark mx-3" to={`/update/user/${currentUser.id}`}>
        <Button variant="outline-dark">Edit</Button>
      </Link>
    </div>
  );
};

export default ProfileComponent;
