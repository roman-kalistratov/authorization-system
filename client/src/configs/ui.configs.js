const uiConfigs = {
  style: {
    gradientBgImage: {
      backgroundImage:
        "linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0))",
    },
    headerSliderSlide: (imgPath) => ({
      width: "100%",
      height: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundImage: `url(${imgPath})`,
      backgroundRepeat: "no-repeat",
      position: "relative",
      "&:before": {
        content: "''",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0, 0.2)",
        zIndex: 999,
        position: "absolute",
      },
    }),
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),
    backgroundImage: (imgPath) => ({
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url("${imgPath}")`,
      backgroundRepeat: "no-repeat",
    }),
  },
};

export default uiConfigs;
