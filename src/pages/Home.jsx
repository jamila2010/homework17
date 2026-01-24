import { userApp } from "../zustand";

function Home() {
  const user = userApp((state) => state.user);
  return (
    <div className="mt-16 flex items-center justify-around">
      {user.photoURL ? (
        <img src={user.photoURL} alt="image" className="w-52" />
      ) : (
        <img
          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          alt="image"
          className="w-52"
        />
      )}
      <div className="flex flex-col justify-center gap-16">
        <h2 className="text-6xl font-bold tracking-widest">
          {user.displayName}{" "}
        </h2>
        <p className="font-semibold tracking-widest">{user.email} </p>
      </div>
    </div>
  );
}

export default Home;
