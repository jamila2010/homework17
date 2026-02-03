import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser, editUser } from "../requests";
import { userApp } from "../zustand";
import { GiCancel } from "react-icons/gi";

function AddUserModal({ onClose, editedUser, setEditedUser }) {
  const setUser = userApp((state) => state.setUser);
  const usersData = userApp((state) => state.usersData);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: editedUser?.name || "",
      phone: editedUser?.phone || "",
      email: editedUser?.email || "",
      address: editedUser?.email || "",
      company: editedUser?.company?.name || "",
    },
  });

  const onSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: { street: data.address },
      company: { name: data.company },
    };
    if (editedUser) {
      editUser({ id: editedUser.id, editedNewUser: newUser })
        .then((res) => {
          const updatedUser = usersData.map((user) =>
            user.id == res.id ? res : user,
          );
          setUser(updatedUser);
          toast.info("Changes saved.");
        })
        .catch((err) => toast.error(err.message));
        onClose()
        setEditedUser(null)
      return;
    }

    createUser(newUser)
      .then((res) => {
        setUser([...usersData, res]);
        toast.success("New user added successfully!");
        reset();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="z-100 flex h-100 w-100 flex-col gap-1 rounded border bg-white px-4"
      >
        <h1 className="w-full text-center text-xl font-semibold">New user</h1>
        <button
          className="fixed top-45 right-145 cursor-pointer text-xl text-gray-500"
          onClick={onClose}
        >
          <GiCancel />
        </button>
        <label htmlFor="name">Name:</label>
        <input
          {...register("name", { required: "Name is required!" })}
          type="text"
          className="mx-auto w-full rounded border"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-700">{errors.name.message} </p>
        )}
        <label htmlFor="email">Email:</label>
        <input
          {...register("email", { required: "Email is required!" })}
          type="text"
          className="mx-auto w-full rounded border"
          placeholder="Enter your email address "
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-700">{errors.email.message} </p>
        )}
        <label htmlFor="name">Phone number:</label>
        <input
          {...register("phone", { required: "Phone is required!" })}
          type="text"
          className="mx-auto w-full rounded border"
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-700">{errors.phone.message} </p>
        )}
        <label htmlFor="name">Company name:</label>
        <input
          {...register("company", { required: "Company name is required!" })}
          type="text"
          className="mx-auto w-full rounded border"
          placeholder="Enter your company name"
        />
        {errors.company && (
          <p className="mt-1 text-xs text-red-700">{errors.company.message} </p>
        )}
        <label htmlFor="name">Address:</label>
        <input
          {...register("address", { required: "Address is required!" })}
          type="text"
          className="mx-auto w-full rounded border"
          placeholder="Enter your current address "
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-700">{errors.address.message} </p>
        )}
        <button
          className="mx-auto mt-2 w-full cursor-pointer rounded border px-3 py-1 hover:bg-amber-800/10"
          onClick={onClose}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddUserModal;
