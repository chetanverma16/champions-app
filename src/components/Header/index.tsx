import Logo from "../../img/logo.png";

const Header = () => {
  return (
    <div className="relative w-full bg-black h-24 flex justify-center">
      <img src={Logo} alt="logo" className="absolute h-24 translate-y-10" />
    </div>
  );
};

export default Header;
