import { useNavigate } from "react-router";
import { useEffectOnce } from "react-use";

export default function Index() {
  const navigate = useNavigate();

  useEffectOnce(() => {
    navigate({
      pathname: "/books",
    });
  });
}
