import "./login.scss";
import { Link,useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useContext,useState } from "react";
// import { userData } from "../../lib/dummydata";

function Login() {
  // seting the usestate hook
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {updateUser} = useContext(AuthContext);
  const navigate = useNavigate();

  // setting the naviagation hook
  // const naviagate = useNavigate();


  const handleSubmit = async (e) =>{
    // This will not gonna refresh the page. e.preventDefault().
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try{

    //Here we are taking the username and passwod and store it to the localstorage by stringify into json and then after login get's successfull we again naviagate to the home page.
    const res = await apiRequest.post("/auth/login",{username, password});

      // Insted of this code we can use the updateUser from the AuthContext.
      // localStorage.setItem("user", JSON.stringify(res.data));

      updateUser(res.data)
      navigate("/");
    }catch(err){
      console.log(err);
      setError(err.response.data.message)
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
