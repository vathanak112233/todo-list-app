import Image from 'next/image'

const NavBar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/logo.png" alt="logo" width={64} height={64} />
      </div>
      <a href="./">Home</a>
    </nav>
  );
};

export default NavBar;
