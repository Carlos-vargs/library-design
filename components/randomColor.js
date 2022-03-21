export function randomColor() {

    let color = `hsla(${(Math.random() * 360).toFixed(0)}, 100%, 85%, 1)`;

    return color;
}
