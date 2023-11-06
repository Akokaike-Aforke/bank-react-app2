import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "./utils";

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
      const { data } = await customFetch("/api/v1/users/me");
      return data;
    },
  });
  return { data, loading, isLoading };
};

export const useGetSpecifiedTransactions = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ startDate, endDate }) => {
      return customFetch.post("/api/v1/transactions/transactionHistory", {
        startDate,
        endDate,
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

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { mutate: editUser } = useMutation({
    mutationFn: ({
      fullname,
      dateOfBirth,
      email,
      username,
      accountType,
      pin,
      password,
    }) => {
      return customFetch.patch(`/api/v1/users/updateMe`, {
        fullname,
        dateOfBirth,
        email,
        username,
        accountType,
        pin,
        password,
      });
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
  const { mutate: loginUser, isLoading } = useMutation({
    mutationFn: ({ username, password }) => {
      return customFetch.post("/api/v1/users/login", { username, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {},
  });
  return { loginUser, isLoading };
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

// export const useCreateDeposit = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isLoading } = useMutation({
//     mutationFn: ({
//     transactionAmount,
//     description,
//   }) => {
//       return customFetch.post("/api/v1/transactions/deposit", {transactionAmount, description});
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       toast.success("deposit was successful");
//     },
//     onError: (error) => {
//       const { data } = { ...error.response };
//       toast.error(data.message);
//       console.log(error);
//     },
//   });
//   return { mutate, isLoading };
// };

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ transactionAmount, description }) => {
      return customFetch.post("/api/v1/transactions/deposit", {
        transactionAmount,
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
