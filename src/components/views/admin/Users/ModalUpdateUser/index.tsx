import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { updateUser, setUpdateUser, setUserData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(updateUser.id, data);
    console.log(result);

    if (result.status === 200) {
      setIsLoading(false);
      setUpdateUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdateUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updateUser.email}
          disabled
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updateUser.fullname}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updateUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updateUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
