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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const { login } = useAuth();
  const navigate = useNavigate();
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
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...dataSend } = data;
    dataSend.amount = String(dataSend.amount);

    mutate(dataSend);
  };

  const validateBudget = () => {
    if (!errors.amount) nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {currentStep === 1 && (
        <div className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Budget
            </label>
            <div className="mt-1">
              <Input
                type="number"
                placeholder="Entrez votre budget mensuel"
                name="amount"
                register={register}
                error={errors.amount}
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4 md:space-y-6">
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
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      <div className="mt-4">
        {currentStep === 1 && (
          <Button
            type="button"
            label="Prochaine étape"
            onClick={() => validateBudget()}
          />
        )}

        {currentStep === 2 && (
          <Button
            type="submit"
            disabled={isLoading}
            label={isLoading ? "Inscription..." : "Inscription"}
          />
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
