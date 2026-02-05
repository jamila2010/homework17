import { NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { userApp } from "../zustand";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function Navbar() {
  const user = userApp((state) => state.user);
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between bg-sky-50 px-30 py-2">
      <img
        className="w-15 rounded md:w-20 lg:w-20"
        src="https://logos-world.net/wp-content/uploads/2025/01/Ubiquiti-Networks-Logo.png"
        alt=""
      />
      <button className={`burger ${open? "translate-x-50":""} `} onClick={()=>{open? setOpen(false): setOpen(true)}}>
        <GiHamburgerMenu />
      </button>
      <ul className={`w-96 navbar mt-3 lg:mt-0 ${open? "open translate-y-full flex flex-col" : "" } `}>
        <li className="cursor-pointer rounded-lg px-5 py-1  hover:bg-cyan-100">
          <NavLink to={"/"}>Home</NavLink>{" "}
        </li>
        <li className="cursor-pointer rounded-lg px-5 py-1 hover:bg-cyan-100">
          <NavLink to={"/users"}>Users</NavLink>{" "}
        </li>
        <li className="cursor-pointer rounded-lg px-5 py-1 hover:bg-cyan-100">
          <NavLink to={"/contact"}>Contact</NavLink>{" "}
        </li>
      </ul>

      {open &&
       <ul className="flex flex-col bg-white px-2 py-px ">
        <li className="cursor-pointer rounded-lg px-5 py-1 hover:bg-cyan-100">
          <NavLink to={"/"}>Home</NavLink>{" "}
        </li>
        <li className="cursor-pointer rounded-lg px-5 py-1 hover:bg-cyan-100">
          <NavLink to={"/users"}>Users</NavLink>{" "}
        </li>
        <li className="cursor-pointer rounded-lg px-5 py-1 hover:bg-cyan-100">
          <NavLink to={"/contact"}>Contact</NavLink>{" "}
        </li>
        <li> <div className="items-center flex gap-3 navbar">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="image"
            className="h-10 w-10 rounded-[50%]"
          />
        ) : (
          <img
            src=" https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="image"
            className="h-10 w-10 rounded-[50%]"
          />
        )}
        <button
          onClick={logout}
          className="cursor-pointer rounded border bg-red-200 px-3 font-bold"
        >
          {" "}
          <IoIosLogOut />{" "}
        </button>
      </div></li>
      </ul>}

      <div className="items-center flex gap-3 navbar" >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="image"
            className="h-10 w-10 rounded-[50%]"
          />
        ) : (
          <img
            src=" https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="image"
            className="h-10 w-10 rounded-[50%]"
          />
        )}
        <button
          onClick={logout}
          className="cursor-pointer rounded border bg-red-200 px-3 font-bold"
        >
          {" "}
          <IoIosLogOut />{" "}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
