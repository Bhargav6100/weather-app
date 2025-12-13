// lib/weatherVideo.js
export function getWeatherVideoSrc(theme) {
  const map = {
    sunny: "/assets/mostlyClear.mp4",
    mainlyClear:"/assets/mostlyClear.mp4",
    cloudy: "/assets/cloudy.mp4",
    rainy: "/assets/rainy3.mp4",
    snowy: "/assets/snowy.mp4",
    fog: "/assets/foggy.mp4",
    thunderStorm:"/assets/thunderStorm.mp4",
    night: "/assets/night.mp4",
    // if you add more themes later (thunder, etc.), put them here
  };

  return map[theme] || map.cloudy;
}
