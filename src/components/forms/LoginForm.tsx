import { useForm } from "react-hook-form";
import { LoginFormData, AuthResponse, LoginSchema } from "../../types";
import Input from "../../shared/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../shared/Button";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "react-query";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, error, isLoading } = useMutation<
    AuthResponse,
    Error,
    LoginFormData
  >(loginUser, {
    onSuccess: (data) => {
      if (data && data.access_token) {
        login(data.access_token);
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login failed : ", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      <div>
        <Button
          type="submit"
          disabled={isLoading}
          label={isLoading ? "Connexion..." : "Connexion"}
        />
      </div>
    </form>
  );
};

export default LoginForm;
