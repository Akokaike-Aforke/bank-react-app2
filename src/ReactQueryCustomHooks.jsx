import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify';
import customFetch from './utils';

export const useGetAllUsers = () =>{
     const { data, isLoading: loading } = useQuery({
       queryKey: ["users"],
       queryFn: async () => {
         const { data } = await customFetch("/api/v1/users/");
         return data;
       },
       
     });
     return { data, loading}
}

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
    mutationFn: ({ fullname, bvn, dateOfBirth, email, username, password,  accountType, accountNumber, pin}) => {
      return customFetch.post("/api/v1/users/", {
        fullname,
        bvn,
        dateOfBirth,
        email,
        username,
        password,
        accountType, accountNumber, pin
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("user added")
    },
    onError: (error) => {
      
        toast.error("error");
      console.log(error);
    },
  });
  return { mutate, isLoading };
};

 export const useEditUser = () => {
   const queryClient = useQueryClient();
   const { mutate: editUser } = useMutation({
     mutationFn: ({ userId, transactions, fullname, dateOfBirth, email, username, accountType, pin, password }) => {
       return customFetch.patch(`/api/v1/users/${userId}`, {
         transactions,
         fullname,
         dateOfBirth,
         email,
         username,
         accountType,
         pin,
         password
       });
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["users"] });
     },
     // onError:()=>{}
   });
   return editUser;
 };

 export const useDeleteUser = () =>{
   const queryClient = useQueryClient();
   const {mutate:deleteUser} = useMutation({
     mutationFn:(userId)=>{return customFetch.delete(`/api/v1/users/${userId}`)}
   }, 
   {
     onSuccess:()=>{
       queryClient.invalidateQueries({queryKey:["users"]})
     }
   }, 
   {
     onError:()=>{
       toast.error("unable to delete account at the moment")
     }
   })
   return {deleteUser}
 }
