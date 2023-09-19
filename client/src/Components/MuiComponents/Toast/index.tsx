import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  ComponentType,
} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

interface Props {
  openToast: boolean;
  setOpenToast: Dispatch<SetStateAction<boolean>>;
  direction: string;
  message: string;
}

export const MuiToast: FC<Props> = ({
  openToast,
  setOpenToast,
  direction,
  message,
}) => {
  const [open, setOpen] = useState(false);

  const [transition, setTransition] = useState<
    ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClick = (Transition: ComponentType<TransitionProps>) => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenToast(false);
  };

  useEffect(() => {
    if (direction === "right") {
      handleClick(TransitionRight);
    }
  }, []);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      message={message}
      key={transition ? transition.name : ""}
    />
  );
};
