import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useStore from "../store";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
} from "react95";
import logoIMG from "../assets/images/logo.png";
import TimeWidget from "./TimeWidget";

export default function TaskBar({}) {
  const [open, setOpen] = React.useState(false);
  const IconRef = useRef();
  const ToolbarRef = useRef();
  const [ShowName, setShowName] = useState(true);
  const windowsStack = useStore((state) => state.windowsStack);
  useEffect(() => {
    const Resize = () => {
      if (IconRef.current && IconRef.current.children[0]) {
        if (IconRef.current.children[0].offsetWidth < 105) {
          setShowName(false);
        } else {
          setShowName(true);
        }
      }
    };
    Resize();
    window.addEventListener("resize", Resize);
    return () => {
      window.removeEventListener("resize", Resize);
    };
  }, [windowsStack]);

  const maxIndex = useStore((state) => state.maxIndex);
  const MoveToTop = useStore((state) => state.MoveToTop);

  return (
    <Toolbar
      ref={ToolbarRef}
      style={{
        background: "rgb(198, 198, 198)",
        borderColor:
          "rgb(254, 254, 254) rgb(10, 10, 10) rgb(10, 10, 10) rgb(254, 254, 254)",
        boxShadow:
          "rgb(223 223 223) 1px 1px 0px 1px inset, rgb(132 133 132) -1px -1px 0px 1px inset",
        justifyContent: "start",
        position: "fixed",
        left: 0,
        bottom: 0,
        height: "40px",
        width: "100%",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <Button
          onClick={() => setOpen(!open)}
          active={open}
          style={{ fontFamily: "ms_sans_serif", fontWeight: "bold" }}
        >
          <img
            src={logoIMG}
            alt="react95 logo"
            style={{
              height: "20px",
              marginRight: 4,
            }}
          />
          Start
        </Button>
        {open && (
          <List
            style={{
              position: "absolute",
              left: "0",
              bottom: "100%",
            }}
            onClick={() => setOpen(false)}
          >
            <ListItem>
              <span role="img" aria-label="👨‍💻">
                👨‍💻
              </span>
              Profile
            </ListItem>
            <ListItem>
              <span role="img" aria-label="📁">
                📁
              </span>
              My account
            </ListItem>
            <Divider />
            <ListItem disabled>
              <span role="img" aria-label="🔙">
                🔙
              </span>
              Logout
            </ListItem>
          </List>
        )}
      </div>
      <div
        ref={IconRef}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          width: "90.5vw",
          maxHeight: "40px",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {windowsStack.map((item, key) => (
          <Button
            active={item.index == maxIndex - 1 && !item.minimized}
            key={key}
            onClick={() => {
              if (item.index != maxIndex - 1) {
                MoveToTop(item.id);
              } else {
                const MinmizeWindow = useStore.getState().MinmizeWindow;
                MinmizeWindow(item.id);
              }

              // console.log("pressed" + item.id);
            }}
            style={{
              fontWeight: "bold",
              fontFamily: "ms_sans_serif",
              width: "200px",
              textAlign: "left",
              justifyContent: ShowName ? "start" : "center",
              marginLeft: "10px",
            }}
          >
            👨‍💻 {ShowName ? item.name : ""}
          </Button>
        ))}
      </div>

      <TimeWidget />
    </Toolbar>
  );
}
