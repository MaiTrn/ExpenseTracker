import { COLORS, icons } from "./constants";

const getIconByCategory = (category) => {
  switch (category) {
    case "education":
      return icons.education;
    case "nutrition":
      return icons.food;
    case "child":
      return icons.baby_car;
    case "beauty":
      return icons.healthcare;
    case "sports":
      return icons.sports_icon;
    case "clothing":
      return icons.cloth_icon;
  }
};

const getColorByCategory = (category) => {
  switch (category) {
    case "education":
      return COLORS.yellow;
    case "nutrition":
      return COLORS.lightBlue;
    case "child":
      return COLORS.darkgreen;
    case "beauty":
      return COLORS.peach;
    case "sports":
      return COLORS.purple;
    case "clothing":
      return COLORS.red;
  }
};
