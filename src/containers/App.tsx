import auth from "../lib/auth";

const App = () => {
  return (
    <>
      <h1>Declutter</h1>
      <button onClick={auth.requestToken}>Sign in with google</button>
    </>
  );
};

export default App;
