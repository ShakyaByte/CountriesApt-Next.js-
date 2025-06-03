"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation"; //nexjs Router For navigation
export default function loginpage() {
  const router = useRouter();
  // ZOD Validation
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be 8 characters"),
    ConfirmPassword: z.string(),
  }).refine(data => data.password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

   //added T for Type of Schema
  type TLoginSchema = z.infer<typeof LoginSchema>;

  //React HOOK Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, //prevents 
    reset,
    getValues, //to match the passwords
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema), //Adding Z Schema to React form 
  });

  const onSubmit = async (data: TLoginSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    router.push("/country"); // Navigate to /country after successful submit
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 to-purple-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl space-y-6 [box-shadow:0px_0px_10px_1.4px_rgba(0,0,0,0.6)] 
          mx-[5%] my-[10%] sm:mx-auto sm:my-auto"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{`${errors.email.message}`}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{`${errors.password.message}`}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Confirm Password</label>
          <input
            {...register("ConfirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2  focus:ring-gray-500"
          />
          {errors.ConfirmPassword && (
            <p className="text-red-500 text-sm mt-1">{`${errors.ConfirmPassword.message}`}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            disabled={isSubmitting}
            className="w-full bg-gray-700 p-3 rounded-xl text-white font-semibold hover:bg-gray-800 
            transition duration-300 ease-in-out cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
