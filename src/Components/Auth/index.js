import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Login from "./Login";
import Register from "./Register";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        width: 500,
        boxShadow: "0px 0px 10px 10px #fff",
        border:'1px solid #206DAB'
      }}
    >
      <AppBar position="static">
        <Tabs
          className="tab-container"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { backgroundColor: "#216CA6" } }}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="Login"
            {...a11yProps(0)}
          />
          <Tab
            // style={{ backgroundColor: "#128C7E" }}
            label="Register"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Register />
      </TabPanel>
    </Box>
  );
}

function Auth() {
  return (
    <div className="auth-container">
      <FullWidthTabs />
    </div>
  );
}

export default Auth;
