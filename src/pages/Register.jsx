import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const [file, setFile] = useState(null);
  const [photoURL, setURL] = useState(null);
  const { register: registerUser, loading } = useAuth();
  const {
    register,
    reset,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const password = getValues("password");
  const submit = (data) => {
    registerUser({ ...data, photoURL: photoURL });
    reset();
  };
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const baseData = reader.result.split(",")[1];
      const formData = new FormData();

      formData.append("key", "70b80c130fc3bc538ade42813a7a1346");
      formData.append("image", baseData);

      try {
        const res = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setURL(data.data.url);
      } catch (error) {
        console.log(error);
      }
    };
  }, [file]);
  return (
    <div className="mt-40 flex flex-col items-center justify-center px-10">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form
        className="flex w-full max-w-96 flex-col gap-2"
        onSubmit={handleSubmit(submit)}
      >
        <label htmlFor="displayName">Name*:</label>
        <input
          className="w-full rounded border"
          type="text"
          name="displayName"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required!" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label htmlFor="imageURL">Image:</label>
        <input
          type="file"
          className="w-full rounded border"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="email">Email*:</label>
        <input
          className="w-full rounded border"
          type="email"
          name="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address, please try again.",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label htmlFor="age">Age*:</label>
        <input
          className="w-full rounded border"
          type="number"
          placeholder="Enter your age"
          {...register("age", {
            required: "Age is required!",
            min: {
              value: 6,
              message: "You are too young for this stie.",
            },
            max: {
              value: 60,
              message: "You are too old for this site.",
            },
          })}
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full flex-col">
            <label htmlFor="password">Password*:</label>
            <input
              className="w-full rounded border"
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 4,
                  message: "Password should contain at least 4 symbols.",
                },
                maxLength: {
                  value: 16,
                  message: "Password should be no more than 16 symbols.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col text-start">
            <label htmlFor="conpassword">Confirm password*:</label>
            <input
              className="w-full rounded border"
              type="password"
              placeholder="Confirm your password"
              {...register("conpassword", {
                required: "Password confirmation is required!",
                validate: (confirm) => {
                  if (confirm === password) {
                    return true;
                  } else {
                    return "Passwords do not match, please, try again.";
                  }
                },
              })}
            />
            {errors.conpassword && (
              <p className="text-red-500">{errors.conpassword.message}</p>
            )}
          </div>
        </div>
        <h1>Gender*:</h1>
        <div className="flex gap-4">
          <div className="flex flex-row-reverse items-center gap-2">
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="male"
              className="mt-1"
              id="male"
              value={"male"}
              {...register("gender", {
                required: "Your gender helps our site work better",
              })}
            />
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex flex-row-reverse items-center gap-2">
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              className="mt-1"
              id="female"
              value={"female"}
              name="female"
              {...register("gender")}
            />
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex flex-row-reverse items-center gap-2">
            <label htmlFor="private">Prefer not to say</label>
            <input
              type="radio"
              name="private"
              className="mt-1"
              id="private"
              value={"private"}
              {...register("gender")}
            />
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>
        </div>
        <button className="rounded border bg-sky-100 px-2 py-px">
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
