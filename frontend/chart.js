import { Origin, Horoscope } from "circular-natal-horoscope-js";

const origin = new Origin({
    year: 2020,
    month: 11, // 0 = January, 11 = December!
    date: 1,
    hour: 16,
    minute: 30,
    latitude: 40.0,
    longitude: -70.0,
});
  
const horoscope = new Horoscope({
    origin: origin,
    houseSystem: "whole-sign",
    zodiac: "tropical",
    aspectPoints: ['bodies', 'points', 'angles'],
    aspectWithPoints: ['bodies', 'points', 'angles'],
    aspectTypes: ["major", "minor"],
    customOrbs: {},
    language: 'en'
});

console.log(horoscope)

export default horoscope;