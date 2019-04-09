import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Plus from "@material-ui/icons/Add";
import Toc from "@material-ui/icons/Toc";
import SettingsIcon from "@material-ui/icons/Settings";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const styles = {
  navbar: {
    backgroundColor: "#4285F4",
    zIndex: "15"
  },
  navbarTitle: {
    flexGrow: 2,
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    color: "white"
  },
  navbarLinks: {
    fontWeight: "500",
    marginLeft: "25px",
    color: "white"
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
};

class NavBarTop extends Component {
  onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    
  state = {
    anchorEl: null,
    left: false
  };

  handleToggle = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState((state) => ({
      anchorEl: null
    }));
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { anchorEl } = this.state;
    const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
          

          <ul className="navbar-nav ml-auto">
                <a href="" color="inherit" style={styles.navbarLinks} className="nav-link" onClick={this.onLogout.bind(this)}>
            
                            Logout
                </a>
            </ul>


        );
        const guestLinks = (
        <Toolbar>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose} component={Link} to="/about">
              About
            </MenuItem>
            <MenuItem onClick={this.handleClose} component={Link} to="/login">
              Login
            </MenuItem>
            <MenuItem
              onClick={this.handleClose}
              component={Link}
              to="/register"
            >
              Register
            </MenuItem>
            
          </Menu>

        </Toolbar>
      );

    

    const sideList = (
      <div>
        <Typography variant="h4" style={styles.navbarTitle}>
          SenZ admin panel
        </Typography>
        <List>
          <ListItem button key="Create Device">
            <Plus />
            <ListItemText primary="Create Device" />
          </ListItem>

          <ListItem button key="Manage Device" component={Link} to="/devices">
            <Toc />
            <ListItemText primary="Manage Device" />
          </ListItem>

          <ListItem button key="Create Project">
            <Plus />
            <ListItemText primary="Create Project" />
          </ListItem>
          <ListItem button key="Your Projects">
            <Toc />
            <ListItemText primary="Your Projects" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Settings">
            <SettingsIcon />
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    );

    return (
    
    <AppBar position="fixed" style={styles.navbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" style={styles.navbarTitle}>
            SenZ admin panel
          </Typography>

          <Button style={styles.navbarLinks} component={Link} to="/dashboard">
            DASHBOARD
          </Button>

           <IconButton
            color="inherit"
            style={styles.navbarLinks}
            onClick={this.handleToggle}
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>


       {isAuthenticated ? authLinks : guestLinks}

       </Toolbar>

        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>

      </AppBar>

);
}
}

NavBarTop.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBarTop));

