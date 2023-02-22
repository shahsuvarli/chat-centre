import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { handleRightDrawer, selectMediaItem } from "../../store/user";

import "./index.css";
import Media from "./Media";
import Docs from "./Docs";
import Links from "./Links";
import Download from "@mui/icons-material/Download";

export default function UserMedia() {
  const { user, selectedMedia } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [content, setContent] = React.useState(user.media[value]);
  const [component, setComponent] = React.useState(
    <Media data={user.media[value].list} />
  );

  React.useEffect(() => {
    const data = user.media[value];
    setContent(data);
    switch (data.name) {
      case "Media":
        setComponent(<Media data={data.list} />);
        break;
      case "Docs":
        setComponent(<Docs data={data.list} />);
        break;
      case "Links":
        setComponent(<Links data={data.list} />);
        break;
      default:
        break;
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <header className="media-header">
        <Box>
          <div className="media-header-icons">
            <div>
              {selectedMedia.length ? (
                <>
                  <CloseIcon onClick={() => dispatch(selectMediaItem([]))} />
                  <Typography variant="h1" fontSize={19} fontWeight={500}>
                    {selectedMedia.length} selected
                  </Typography>
                </>
              ) : (
                <ArrowBackIcon
                  sx={{ color: "#fff" }}
                  color="#fff"
                  onClick={() =>
                    dispatch(
                      handleRightDrawer({ open: true, name: "User card" })
                    )
                  }
                />
              )}
            </div>
            {selectedMedia.length ? (
              <div>
                <StarIcon />
                <DeleteIcon />
                <ShortcutIcon />
                <Download />
              </div>
            ) : (
              <></>
            )}
          </div>
        </Box>
        <Tabs
          className="media-tabs"
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{ sx: { backgroundColor: "#9eeab5", height: 4 } }}
        >
          {user.media.map((file) => (
            <Tab key={file.name} label={file.name} />
          ))}
        </Tabs>
      </header>
      <div className="media-data-container">
        {content.list.length ? (
          <div className="fef">{component}</div>
        ) : (
          <div className="no-media-data">
            No{" "}
            {content.name.charAt(0) +
              content.name.slice(1, content.name.length).toLowerCase()}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
