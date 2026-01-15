import { NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-20 mt-2">
      <img
        className="w-20"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhvbmrGJRrEhJA_HeS_xQvUftbN08kScpZrA&s"
        alt=""
      />
      <ul className="text-center flex items-center gap-15">
        <li className="px-5 py-1 cursor-pointer hover:bg-cyan-100 rounded-lg">
          <NavLink to={"/"}>Home</NavLink>{" "}
        </li>
        <li  className="px-5 py-1 cursor-pointer hover:bg-cyan-100 rounded-lg">
          <NavLink to={"/users"}>Users</NavLink>{" "}
        </li>
        <li className="px-5 py-1 cursor-pointer hover:bg-cyan-100 rounded-lg"  >
          <NavLink to={"/contact"}>Contact</NavLink>{" "}
        </li>
      </ul>
      <button className="flex items-center gap-4 border rounded px-4 py-1 cursor-pointer font-bold bg-red-200 ">Sign Out <IoIosLogOut /> </button>
    </div>
  );
}

export default Navbar;
