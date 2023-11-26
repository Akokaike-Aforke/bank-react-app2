import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "./utils";
import { useParams } from "react-router-dom";

export const useGetAllUsers = () => {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await customFetch("/api/v1/users/");
      return data;
    },
  });
  return { data, loading };
};

export const useGetUser = () => {
  const { data, loading, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await customFetch("/api/v1/users/me", {withCredentials: true});
      return data;
    },
  });
  return { data, loading, isLoading };
};

export const useGetSpecifiedTransactions = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ startDate, endDate, activity, clientUsername, selectedAccount }) => {
      return customFetch.post("/api/v1/transactions/transactionHistory", {
        startDate,
        endDate,
        activity,
        clientUsername,
        selectedAccount
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return {mutate, isLoading}
};

// export const useFetchTasks = () => {
//   const result = useQuery({
//     queryKey: ["tasks"],
//     queryFn: async () => {
//       const { data } = await customFetch("/");
//       return data;
//     },
//   });
//   return result;
// };
// export const useCreateUser = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isLoading } = useMutation({
//     mutationFn: ({ firstname, lastname, username, pin }) => {
//       return customFetch.post("/api/v1/users/", {
//         firstname,
//         lastname,
//         username,
//         pin,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
//   return { mutate, isLoading };
// };

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      fullname,
      bvn,
      dateOfBirth,
      email,
      username,
      password,
      passwordConfirm,
      accountType,
      accountNumber,
      pin,
      pinConfirm,
    }) => {
      return customFetch.post("/api/v1/users/signup", {
        fullname,
        bvn,
        dateOfBirth,
        email,
        username,
        password,
        passwordConfirm,
        accountType,
        accountNumber,
        pin,
        pinConfirm,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("user added");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return customFetch.post("/api/v1/accounts", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("account number successfully generated");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};

// export const useEditProfilePhoto = () => {
//   const queryClient = useQueryClient();
//   const { mutate: editUser } = useMutation({
//     mutationFn: (
//       formData
//     ) => {
//       return customFetch.patch(`/api/v1/users/updateMe`, 
//         formData
//       , { headers: {'Content-Type': 'multipart/form-data'}});
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//     // onError:()=>{}
//   });
//   return editUser;
// };



export const useEditProfilePhoto = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (profilePhoto) => {
      return customFetch.patch(
        `/api/v1/users/updateMe`,
        { profilePhoto },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your profile image was updated successfully")
    },
    onError:(error)=>{
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    }
  });
  return {mutate, isLoading};
};


export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { mutate: editUser } = useMutation({
    mutationFn: (fullname) => {
      return customFetch.patch(`/api/v1/users/updateMe`, {fullname});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    // onError:()=>{}
  });
  return editUser;
};


export const useEditSelectedAccount = () => {
  const queryClient = useQueryClient();
  const { mutate: editSelectedAccount } = useMutation({
    mutationFn: async ({
      selectedAccount,
    }) => {
      const response = await customFetch.patch(`/api/v1/users/updateSelectedAccount`, {
        selectedAccount,
      });
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    // onError:()=>{}
  });
  return editSelectedAccount;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteUser } = useMutation(
    {
      mutationFn: (userId) => {
        return customFetch.delete(`/api/v1/users/${userId}`);
      },
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
    {
      onError: () => {
        toast.error("unable to delete account at the moment");
      },
    }
  );
  return { deleteUser };
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: loginUser, isLoading, isError, error } = useMutation({
    mutationFn: ({ username, password }) => {
      return customFetch.post(
        "/api/v1/users/login",
        { username, password },
        {
          withCredentials: true, // include credentials (cookies)
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {},
  });
  return { loginUser, isLoading, isError, error };
};

export const useTransfer = () => {
  const queryClient = useQueryClient();
  const { mutate: transfer, isLoading } = useMutation({
    mutationFn: ({ receiverUsername, transactionAmount, pin, description }) => {
      return customFetch.post("/api/v1/transactions", {
        receiverUsername,
        transactionAmount,
        pin,
        description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ["users"] });
    },
    onError: () => {},
  });

  return { transfer, isLoading };
};



export const useCreateDeposit = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ transactionAmount, pin, description }) => {
      return customFetch.post("/api/v1/transactions/deposit", {
        transactionAmount,
        pin,
        description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your deposit was successful");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};





export const useForgotPassword = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (email) => {
      return customFetch.post("/api/v1/users/forgotPassword", {
        email
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your password reset token was successfully sent");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};



export const useResetPassword = () => {
  const queryClient = useQueryClient();
  const {token} = useParams();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({password, passwordConfirm}) => {
      return customFetch.patch(`/api/v1/users/resetPassword/${token}`, {
        password, passwordConfirm
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your password reset was successful");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ password, passwordConfirm, passwordCurrent }) => {
      return customFetch.patch(`/api/v1/users/updateMyPassword`, {
        password,
        passwordConfirm,
        passwordCurrent
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your password change was successful");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};



export const useForgotPin = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({email, password}) => {
      return customFetch.post("/api/v1/users/forgotPin", {
        email, password
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your pin reset token was successfully sent");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};


export const useResetPin = () => {
  const queryClient = useQueryClient();
  const { token } = useParams();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ pin, pinConfirm }) => {
      return customFetch.patch(`/api/v1/users/resetPin/${token}`, {
        pin,
        pinConfirm,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your pin reset was successful");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};


export const useUpdatePin = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ password, pin, pinConfirm, pinCurrent }) => {
      return customFetch.patch(`/api/v1/users/updatePin`, {
        password,
        pin,
        pinConfirm,
        pinCurrent,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Your pin change was successful");
    },
    onError: (error) => {
      const { data } = { ...error.response };
      toast.error(data.message);
      console.log(error);
    },
  });
  return { mutate, isLoading };
};



// export const useUploadProfilePhoto = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isLoading } = useMutation({
//     mutationFn: ({ profilePhoto}) => {
//       return customFetch.patch(
//         "/api/v1/users/profilePhoto",
//         {
//           profilePhoto,
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       toast.success("Your upload was successful");
//     },
//     onError: (error) => {
//       const { data } = { ...error.response };
//       toast.error(data.message);
//       console.log(error);
//     },
//   });
//   return { mutate, isLoading };
// };

