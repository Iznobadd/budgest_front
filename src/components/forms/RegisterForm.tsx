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
import usePostRequest from "../../hooks/usePostRequest";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm: React.FC = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const { postRequest, loading, error } = usePostRequest<
    RegisterFormDataToSend,
    AuthResponse
  >("auth/register");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...dataSend } = data;
      const response = await postRequest(dataSend);
      if (response && response.access_token) {
        login(response.access_token);
      }
    } catch (err) {
      console.error("Registration failed", err);
    }
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <Button
          type="submit"
          disabled={loading}
          label={loading ? "Inscription..." : "Inscription"}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
