import classes from "./index.module.scss";

const VideoFrame = () => {
  const src = "https://www.youtube.com/embed/6EG9yPdyzDg?si=ROvLv0Dy6zsgmA5V";

  return (
    <iframe
      width="100%"
      height="35%"
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={classes.video}
    />
  );
};

export default VideoFrame;
