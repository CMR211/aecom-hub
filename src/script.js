import resources from "./resources.json" assert { type: "json" }

const container = document.querySelector("#list-container")

const time_pl_h = document.querySelector("#time-pl-h")
const time_pl_m = document.querySelector("#time-pl-m")
const time_us_h = document.querySelector("#time-us-h")
const time_us_m = document.querySelector("#time-us-m")
const time_ca_h = document.querySelector("#time-ca-h")
const time_ca_m = document.querySelector("#time-ca-m")

setInterval(() => {
    const [pl_h, pl_m] = calculateTime("local")
    time_pl_h.textContent = pl_h
    time_pl_m.textContent = pl_m
    const [us_h, us_m] = calculateTime(-5)
    time_us_h.textContent = us_h
    time_us_m.textContent = us_m
    const [ca_h, ca_m] = calculateTime(-7)
    time_ca_h.textContent = ca_h
    time_ca_m.textContent = ca_m
}, 1000)

resources.forEach((res) => {
    const el = document.createElement("a")
    el.classList.add("card")
    el.setAttribute("href", res.url)
    el.innerHTML = `
        <div class="image-container">
            <img src=${res.img} />
        </div>
        <p class="title">${res.name}</p>`
    container.append(el)
})

function calculateTime(offset) {
    let time_timezone
    if (offset !== "local") {
        const time_local = new Date()
        const time_utc = time_local.getTime() + time_local.getTimezoneOffset() * 60000
        time_timezone = new Date(time_utc + 3600000 * offset)
    }
    if (offset === "local") {
        time_timezone = new Date()
    }
    const hours = time_timezone.getHours() < 10 ? `0${time_timezone.getHours()}` : time_timezone.getHours()
    const minutes = time_timezone.getMinutes() < 10 ? `0${time_timezone.getMinutes()}` : time_timezone.getMinutes()
    return [hours,minutes]
}
