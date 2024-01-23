import classes from "./index.module.scss";

type UnAvailableTextProps = {
  dish: string;
  category: string;
};

const UnAvailableText = ({ dish, category }: UnAvailableTextProps) => {
  return (
    <div className={classes.content}>
      <a className={classes.red}>{dish}</a>
      <a> trong </a>
      <a className={classes.red}>{category}</a>
      <a> hiện tạm hết, vui lòng chọn món thay thế!</a>
    </div>
  );
};

export default UnAvailableText;
