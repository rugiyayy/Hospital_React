import { useDisclosure, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/slices/accountSlice";
import { httpClient } from "../utils/httpClient";
import registerSchema from "../validations/registerSchema";

export default function useSignUpModal() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.account);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      birthDate: "",
      phoneNumber: "",
      patientIdentityNumber: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      registerQuery(values);
    },
    validationSchema: registerSchema,
  });

  const onClose = () => {
    formik.resetForm();
    _onClose();
  };

  const registerQuery = async (values) => {
    try {
      const response = await httpClient.post("/Patient", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Signed Up.",
        description: "You have been signed up successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response?.data &&
        error.response?.data?.errors
      ) {
        formik.setErrors(
          error?.response?.data?.errors ||
            error?.response?.data ||
            "Something went wrong. Please try again later."
        );
        toast({
          title: "Error",
          description:
            error?.response?.data?.errors?.Email ||
            error?.response?.data?.errors?.Password ||
            error?.response?.data?.errors?.UserName ||
            error?.response?.data?.Errors?.IsAdmin ||
            error?.response?.data?.errors?.FullName ||
            error?.response?.data ||
            "Something went wrong. Please try again later.",

          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error",
          description:
            error?.response?.data?.errors?.Email ||
            error?.response?.data?.errors?.Password ||
            error?.response?.data?.errors?.UserName ||
            error?.response?.data?.Errors?.IsAdmin ||
            error?.response?.data?.errors?.FullName ||
            error?.response?.data ||
            error?.response ||
            "Something went wrong. Please try again later.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { onOpen, isOpen, onClose, formik, isLoading };
}
