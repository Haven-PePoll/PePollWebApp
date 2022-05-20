import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";

interface StarsDisplayProps {
  numberOfStars: number;
}

export const StarsDisplay: React.FC<StarsDisplayProps> = (props) => {
  return (
    <div>
      <Rating
        name="text-feedback"
        value={props.numberOfStars}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 1, color: "gray" }} fontSize="inherit" />}
        size="large"
      />
    </div>
  );
};
