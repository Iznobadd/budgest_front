import { useForm } from "react-hook-form";
import { LoginFormData, AuthResponse, LoginSchema } from "../../types";
import Input from "../../shared/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostRequest from "../../hooks/usePostRequest";
import Button from "../../shared/Button";
import { useAuth } from "../../hooks/useAuth";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { postRequest, loading, error } = usePostRequest<
    LoginFormData,
    AuthResponse
  >("auth/login");

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await postRequest(data);
      if (response && response.access_token) {
        login(response.access_token);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <Button
          type="submit"
          disabled={loading}
          label={loading ? "Connexion..." : "Connexion"}
        />
      </div>
    </form>
  );
};

export default LoginForm;
