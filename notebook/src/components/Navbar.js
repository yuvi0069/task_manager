import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar(props) {
  const [name, setName] = useState('');
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user/getuser", {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            'token': localStorage.getItem("token")
          }
        });
        const json = await response.json();
        const d = json.msg;
        setName(d); // Set the resolved value to the state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [localStorage.getItem("token")]);
const onChange=async(e)=>{
  setName({...name,[e.target.name]:e.target.value})
}
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mod} bg-${props.mod} `}>
        <div className="container-fluid">
          {!localStorage.getItem("token") ?
            <Link className="navbar-brand" to="/">{props.title}</Link> :
            <Link className="navbar-brand" to="/home">{props.title}</Link>}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {localStorage.getItem("token") ?
                  <Link className="nav-link active" aria-current="page" to="/home">Home</Link> :
                  <Link className="nav-link active" aria-current="page" to="/"></Link>}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            <div className="navbar-nav ml-auto">
            <div className="collapse navbar-collapse navbar-nav me-auto mb-3 mb-lg-0" id="navbarSupportedContent">
              {localStorage.getItem("token") ?
                <div className={`nav-link active mx-2`} aria-current="page" value={name} onChange={onChange}>Hi {name}</div> :
                <div></div>}
                </div>
            </div>
            <div className="form-check form-switch me-3">
              <input onClick={props.tog} className="form-check-input mx-2" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Mode Changer</label>
            </div>
            {!localStorage.getItem("token") ?
              <form className="d-flex me-3">
                <Link className="btn btn-outline-success" type="submit" to="/signup">SignUp</Link>
              </form> :
              <button className="btn btn-outline-success mx-2" type="submit" onClick={logout}>Logout</button>}
               {!localStorage.getItem("token") ?
              <form className="d-flex">
                <Link className="btn btn-outline-success" type="submit" to="/">Login</Link>
              </form> :
             <></>}
          </div>
        </div>
      </nav>
    </div>
  );
}
