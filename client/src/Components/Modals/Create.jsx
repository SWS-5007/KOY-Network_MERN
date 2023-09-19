import { Box, Grid, Link, Modal, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import ProjectIcon from "../../Icons/Project";
import CodeIcon from "../../Icons/Code";
import NotificationIcon from "../../Icons/Notification";
import HumanHeadIcon from "../../Icons/HumanHead";
import { Search } from "@mui/icons-material";
import { Mui_SearchInput } from "../MuiComponents/SearchInput";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, 0%)",
  width: 800,
  maxHeight: 400,
  overflow: "auto",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  backgroundColor: "#ffffff",
};

const initItems = [
  {
    name: "Project",
    icon: ProjectIcon,
    url: "/project/create",
  },
  {
    name: "Alarm",
    icon: NotificationIcon,
    url: "/alarm/create",
  },
  {
    name: "Technical Test",
    icon: CodeIcon,
    url: "/technical/create",
  },
  {
    name: "Personality Test",
    icon: HumanHeadIcon,
    url: "/personality/create",
  },
];

export const Create = ({ open, setOpen }) => {
  const theme = useTheme();
  const [items, setItems] = useState(initItems);
  const onClickItem = (url) => {
    window.location.href = "http://localhost:3000" + url;
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography variant="h6">What would you like to create?</Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Mui_SearchInput
              placeholder="Search"
              initRows={initItems}
              setRows={setItems}
              startIcon={<Search />}
            />
          </Box>
          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <Grid container spacing={2}>
              {items.length > 0 ? (
                items.map((item, key) => (
                  <Grid key={key} item xs={6}>
                    <Box
                      sx={{
                        borderRadius: theme.borderRadius.main,
                        border: theme.border.main,
                        p: 2,
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#e3e3ee",
                        },
                      }}
                      onClick={() => onClickItem(item.url)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <item.icon
                          width={25}
                          height={25}
                          iconcolor={theme.palette.primary.main}
                        />
                        <Typography
                          sx={{
                            ml: "10px",
                            fontWeight: "500",
                            fontSize: "18px",
                          }}
                          variant="span"
                        >
                          {item.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mt: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#172b4d",
                          }}
                          variant="span"
                        >
                          Streamline software projects, sprint planning, and bug
                          tracking with Project
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Not found
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
