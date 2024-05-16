import LoginView from "@/components/views/auth/Login";
import { Dispatch, SetStateAction } from "react";

const LoginPage = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  return (
    <div>
      <LoginView setToaster={setToaster} />
    </div>
  );
};

export default LoginPage;
