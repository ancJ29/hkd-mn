import classes from "./index.module.scss";

const VideoFrame = () => {
  return (
    <iframe
      width="100%"
      height="31%"
      src="https://www.youtube.com/embed/jhIl9Ktt1FE?si=RdPjesKkgB9MnUoS"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      className={classes.video}
    />
  );
};

export default VideoFrame;
