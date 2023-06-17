import Image from "next/image";
import ButtonSign from "./ButtonSign";

const NavBar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/logo.png" alt="logo" width={64} height={64} />
      </div>
      <ButtonSign />
    </nav>
  );
};

export default NavBar;
