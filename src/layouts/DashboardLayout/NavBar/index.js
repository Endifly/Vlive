/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useLocation, matchPath } from "react-router";
import { Link as RouterLink } from "react-router-dom";
//import { useSelector } from 'react-redux';
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles,
} from "@material-ui/core";
// import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  // Briefcase as BriefcaseIcon,
  // Calendar as CalendarIcon,
  // ShoppingCart as ShoppingCartIcon,
  // Folder as FolderIcon,
  BarChart as BarChartIcon,
  // Lock as LockIcon,
  // UserPlus as UserPlusIcon,
  // Shield as ShieldIcon,
  // AlertCircle as AlertCircleIcon,
  // Trello as TrelloIcon,
  // User as UserIcon,
  // Layout as LayoutIcon,
  // Edit as EditIcon,
  // DollarSign as DollarSignIcon,
  // Mail as MailIcon,
  // MessageCircle as MessageCircleIcon,
  // PieChart as PieChartIcon,
  // Share2 as ShareIcon,
  // Users as UsersIcon
} from "react-feather";
// import Logo from 'src/components/Logo';
import NavItem from "./NavItem";

const navConfig = [
  {
    subheader: "Dashboard",
    items: [
      {
        title: "Home",
        icon: BarChartIcon,
        href: "/app/dashboard/home",
      },
      {
        title: "ขาย",
        icon: BarChartIcon,
        href: "/app/reports/dashboard5",
      },
      {
        title: "ค้นหารายการสั่งซื้อ",
        icon: BarChartIcon,
        href: "/app/reports/board2",
      },
      {
        title: "รายการสั่งซื้อ",
        icon: BarChartIcon,
        href: "/app/reports/board3",
      },
      {
        title: "ค้นหาลูกค้า",
        icon: BarChartIcon,
        href: "/app/reports/board4",
      },
    ],
  },
  {
    subheader: "Account",
    items: [
      {
        title: "ผู้ดูแลระบบ",
        icon: BarChartIcon,
        href: "/app/models/createmodels",
      },
      {
        title: "ออกจากระบบ",
        icon: BarChartIcon,
        href: "/",
      },
    ],
  },

];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

function NavBar({ openMobile, onMobileClose }) {
  const classes = useStyles();
  const location = useLocation();
  //const { user } = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">{/* <Logo /> */}</RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account"></RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {`MARK-KJ`}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {/* {user.bio} */}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {config.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: config.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box p={2} borderRadius="borderRadius" bgcolor="background.dark">
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
