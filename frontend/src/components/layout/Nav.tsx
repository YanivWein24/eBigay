import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ClearOutlined,
  Logout,
  Settings,
  VolunteerActivism,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import {
  LinksContainer,
  StyledCancelButton,
  StyledLink,
} from "../../assets/styles/layout/Header.styled";
import PrimaryButton from "../../assets/styles/base/Button.styled";
import ScreenOverlay from "./ScreenOverlay";
import SearchForm from "../SearchForm";
import useAuthContext from "../../hooks/useAuthContext";
import useAuth from "../../hooks/useAuth";

interface INavBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: Dispatch<SetStateAction<boolean>>;
}

const Nav = ({
  isMenuOpen,
  setIsMenuOpen,
  isSearchBarOpen,
  setIsSearchBarOpen,
}: INavBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const {
    state: { user },
  } = useAuthContext();

  const { logout } = useAuth();

  const { mutate: logoutUser } = logout;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    logoutUser();
    toggleIsMenuOpen();
  };

  return (
    <>
      <ScreenOverlay handleClick={toggleIsMenuOpen} isMenuOpen={isMenuOpen} />
      <SearchForm
        isSearchBarOpen={isSearchBarOpen}
        setIsSearchBarOpen={setIsSearchBarOpen}
      />
      <LinksContainer isMenuOpen={isMenuOpen}>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About Us</StyledLink>
        {user ? (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={user.imgUrl} sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Tooltip>
        ) : (
          <PrimaryButton
            width="172px"
            height="50px"
            fontSize="s"
            onClick={() => navigate("/login")}
          >
            Log in/Sign up
          </PrimaryButton>
        )}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/profile")}>
            <Avatar src={user?.imgUrl} sx={{ width: 40, height: 40 }} />
            Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <VolunteerActivism fontSize="small" />
            </ListItemIcon>
            Add new item
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <StyledCancelButton isMenuOpen={isMenuOpen} onClick={toggleIsMenuOpen}>
          <ClearOutlined fontSize="medium" />
        </StyledCancelButton>
      </LinksContainer>
    </>
  );
};

export default Nav;
