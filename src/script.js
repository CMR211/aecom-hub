import resources from "./resources.json" assert { type: "json" }

const container = document.querySelector("#list-container")

const time_pl = document.querySelector("#time-pl")
const time_us = document.querySelector("#time-us")
const time_ca = document.querySelector("#time-ca")

setInterval(() => {
    time_pl.textContent = calculateTime("local")
    time_us.textContent = calculateTime(-5)
    time_ca.textContent = calculateTime(-7)
}, 500)

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
    const seconds = time_timezone.getSeconds() < 10 ? `0${time_timezone.getSeconds()}` : time_timezone.getSeconds()
    return `${hours}:${minutes}`
}
