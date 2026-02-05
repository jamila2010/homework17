import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { userApp } from "../zustand";
import { FaTrash } from "react-icons/fa";
import { deleteUser,  } from "../requests";
import { toast } from "sonner";
import AddUserModal from "../components/AddUserModal";
import { useAuth } from "../hooks/useAuth";

function Users() {
  const usersData = userApp((state) => state.usersData);
  const setUser = userApp((state) => state.setUser);
  const [showModal, setShowModal] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
   const { loading } = useAuth();
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) {
      window.addEventListener("keydown", handleEsc);
    }
  }, [showModal]);

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
  const handleEdit = (user) => {
    setEditedUser(user);
    
  };

  return (
    <div className="flex flex-col items-center gap-5 py-10">
      <h1 className="text-2xl font-bold italic">Users' list</h1>
      <button
        className="cursor-pointer rounded border px-3 py-px"
        onClick={() => {
          setEditedUser(false)
          setShowModal(true);
        }}
      >
        Add user +
      </button>
      <div
        className="flex flex-wrap justify-center gap-5 px-10"
        
      >
  
        {usersData?.map((user) => {
          return (
            <div
              key={user.id}
              className="w-80 cursor-pointer rounded-sm border px-2 py-1 shadow-md"
            >
              <button
                className="cursor-pointer hover:rotate-12 hover:text-red-600"
                onClick={() => handleDelete({ id: user.id, name: user.name })}
              >
                <FaTrash />
              </button>
              <h2 className="text-center text-xl font-semibold">
                {user.name}{" "}
              </h2>
              <small className="flex justify-around text-center text-[8px]">
                <span>
                  {" "}
                  <b>email address:</b>
                  <i> {user.email}</i>{" "}
                </span>
                <span>
                  <b>phone number:</b>
                  <i>{user.phone}</i>{" "}
                </span>
              </small>
              <p className="text-center font-medium">
                Company: {user.company.name}
              </p>
              <p className="text-center">Address:{user.address.street} St. </p>

              <button
                className="mx-auto cursor-pointer text-center text-lg hover:text-xl active:text-lg"
                onClick={() => {
                  setShowModal(true);
                  handleEdit(user)
                }}
              >
                {" "}
                <FaUserEdit />{" "}
              </button>
            </div>
          );
        })}
        {showModal && (
          <AddUserModal
            editedUser={editedUser}
            setEditedUser={setEditedUser}
            onClose={() => {
              setShowModal(false);
            }}
            
          />
        )}
      </div>
    </div>
  );
}

export default Users;
