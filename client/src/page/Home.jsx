import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div>
        <button>
          <Link to={"/login"}>Login</Link>
        </button>
        <button>
          <Link to={"/registro"}>Registro</Link>
        </button>
      </div>
    </>
  );
};

export default Home;
