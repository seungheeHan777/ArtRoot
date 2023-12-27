import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import FindPWForm from "../containers/auth/FindPWForm";
const FindPW = () => {
  return (
    <div>
      <div>
        <AuthTemplate>
          <FindPWForm />
        </AuthTemplate>
      </div>
    </div>
  );
};

export default FindPW;
