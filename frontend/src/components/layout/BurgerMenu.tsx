import { Dispatch, SetStateAction } from "react";
import StyledBurgerMenu from "../../assets/styles/layout/BurgerMenu.styled";

interface IBurgerMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu = ({ isMenuOpen, setIsMenuOpen }: IBurgerMenuProps) => {
  return (
    <StyledBurgerMenu
      isMenuOpen={isMenuOpen}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <div />
      <div />
      <div />
    </StyledBurgerMenu>
  );
};

export default BurgerMenu;
