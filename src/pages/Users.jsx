import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { userApp } from "../zustand";

function Users() {
  const usersData = userApp((state) => state.usersData);
  const setUser = userApp((state) => state.setUser);
  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 py-10">
      <h1 className="text-2xl font-bold italic">Users' list</h1>
      <div className="flex flex-wrap justify-center gap-5 px-10">
        {usersData?.map(({ id, address, name, email, company, phone }) => {
          return (
            <div key={id} className="w-80 rounded-sm border p-24 shadow-md text-center cursor-pointer">
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
              <p className="text-center font-medium">
                Company: {company.name}
              </p>
              <p>Address:{address.street} St.  </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
