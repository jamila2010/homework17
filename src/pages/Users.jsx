import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { userApp } from "../zustand";
import { FaTrash } from "react-icons/fa";
import { deleteUser } from "../requests";
import { toast } from "sonner";
import { GiCancel } from "react-icons/gi";

function Users() {
  const usersData = userApp((state) => state.usersData);
  const setUser = userApp((state) => state.setUser);
  const [open, setOpen] = useState(null);
  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleDelete = ({ id, name }) => {
    console.log(id, name);
    deleteUser(id)
      .then(() => {
        setUser(usersData.filter((user) => user.id !== id));
        toast.info(`User ${name} deleted successfully`);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex flex-col items-center gap-5 py-10">
      <h1 className="text-2xl font-bold italic">Users' list</h1>
      <button
        className="rounded border px-3 py-px"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add user +
      </button>
      <div
        className="flex flex-wrap justify-center gap-5 px-10"
        onClick={() => {
          setOpen(false);
        }}
      >
        {usersData?.map(({ id, address, name, email, company, phone }) => {
          return (
            <div
              key={id}
              className="w-80 cursor-pointer rounded-sm border p-24 text-center shadow-md"
            >
              <button
                className="w-full cursor-pointer hover:rotate-12 hover:text-red-600"
                onClick={() => handleDelete({ id, name })}
              >
                <FaTrash />
              </button>
              <h2 className="text-center text-xl font-semibold">{name} </h2>
              <small className="flex justify-around text-[8px]">
                <span>
                  {" "}
                  <b>email address:</b>
                  <i> {email}</i>{" "}
                </span>
                <span>
                  <b>phone number:</b>
                  <i>{phone}</i>{" "}
                </span>
              </small>
              <p className="text-center font-medium">Company: {company.name}</p>
              <p>Address:{address.street} St. </p>

              <button className="cursor-pointer text-lg hover:text-xl active:text-lg">
                {" "}
                <FaUserEdit />{" "}
              </button>
            </div>
          );
        })}
        {open && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50"
            onClick={(e) => (
              
              e.stopPropagation()
              
            )}
          >
            <button
              className="fixed top-20 right-120 cursor-pointer text-xl text-white"
              onClick={() => {
                setOpen(false);
              }}
            >
              <GiCancel />
            </button>
            <form
              onClick={(e) => e.stopPropagation()}
              className="z-100 flex h-100 w-[400px] flex-col gap-1 rounded border bg-white px-3"
            >
              <h1 className="w-full text-center text-xl font-semibold">
                New user
              </h1>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="mx-auto w-full border"
                placeholder="Enter your name"
              />
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="mx-auto w-full border"
                placeholder="Enter your email address "
              />
              <label htmlFor="name">Phone number:</label>
              <input
                type="text"
                className="mx-auto w-full border"
                placeholder="Enter your phone number"
              />
              <label htmlFor="name">Company name:</label>
              <input
                type="text"
                className="mx-auto w-full border"
                placeholder="Enter your company name"
              />
              <label htmlFor="name">Address:</label>
              <input
                type="text"
                className="mx-auto w-full border"
                placeholder="Enter your current address "
              />
              <button className="mx-auto mt-2 w-full cursor-pointer border px-3 py-1 hover:bg-amber-800/10">
                Add
              </button>
            </form>
            <h1>Modal</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
