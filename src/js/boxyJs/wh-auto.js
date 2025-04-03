export default () => {
  function setSquare() {
    const hwAuto = document.querySelectorAll(".hw-auto");
    const whAuto = document.querySelectorAll(".wh-auto");

    hwAuto.forEach((element) => {
      const height = element.offsetHeight;
      element.style.width = `${height}px`;
    });

    whAuto.forEach((element) => {
      const width = element.offsetWidth;
      element.style.height = `${width}px`;
    });
  }

  window.addEventListener("load", setSquare);
  window.addEventListener("resize", setSquare);
};
