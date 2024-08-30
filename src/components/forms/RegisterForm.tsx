import { useForm } from "react-hook-form";
import {
  AuthResponse,
  RegisterFormData,
  RegisterFormDataToSend,
  RegisterSchema,
} from "../../types";
import Input from "../../shared/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../shared/Button";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "react-query";
import { registerUser } from "../../api";

const RegisterForm: React.FC = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate, isLoading, error } = useMutation<
    AuthResponse,
    Error,
    RegisterFormDataToSend
  >(registerUser, {
    onSuccess: (data) => {
      if (data && data.access_token) {
        login(data.access_token);
      }
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...dataSend } = data;
    mutate(dataSend);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <div className="mt-1">
          <Input
            type="email"
            placeholder="Entrez votre email"
            name="email"
            register={register}
            error={errors.email}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mot de passe
        </label>
        <div className="mt-1">
          <Input
            type="password"
            placeholder="Entrez votre mot de passe"
            name="password"
            register={register}
            error={errors.password}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirmez le mot de passe
        </label>
        <div className="mt-1">
          <Input
            type="password"
            placeholder="Confirmez votre mot de passe"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      <div>
        <Button
          type="submit"
          disabled={isLoading}
          label={isLoading ? "Inscription..." : "Inscription"}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
