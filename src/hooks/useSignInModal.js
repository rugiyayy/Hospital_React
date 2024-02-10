import { useDisclosure, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/slices/accountSlice";
import { httpClient } from "../utils/httpClient";
import loginSchema from "../validations/loginSchema";

export default function useSignInModal() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose: _onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.account);
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      loginQuery(values);
    },
    validationSchema: loginSchema,
  });

  const onClose = () => {
    formik.resetForm();
    _onClose();
  };

  const loginQuery = async (values) => {
    try {
      const response = await httpClient.post("/Account/SignIn", values,{
        headers: {
            Authorization: `Bearer ${token}`,
          }
      });
      toast({
        title: "Logged in.",
        description: "You have been signed in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      
      dispatch(
        loginAction({ token: response.data, userName: values.userName })
      );
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { onOpen, isOpen, onClose, formik, isLoading };
}
