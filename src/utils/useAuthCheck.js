import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useAuthCheck() {
  const navigate = useNavigate();
  const { err } = useSelector((state) => state.info);
  const { errUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (
      err?.reason == "TokenExpiredError" ||
      err?.reason == "JsonWebTokenError" ||
      errUser?.reason == "TokenExpiredError" ||
      errUser?.reason == "JsonWebTokenError"
    ) {
      navigate("/signin");
    }
  }, [err, errUser, navigate]);
}

export default useAuthCheck;
