import resources from "./resources.json" assert { type: "json" }

const container = document.querySelector("#list-container")

const time_pl_h = document.querySelector("#time-pl-h")
const time_pl_m = document.querySelector("#time-pl-m")
const time_ir_h = document.querySelector("#time-ir-h")
const time_ir_m = document.querySelector("#time-ir-m")
const time_us_h = document.querySelector("#time-us-h")
const time_us_m = document.querySelector("#time-us-m")

const isDST = () => {
    const today = new Date()
    const day = today.getUTCDate()
    const month = today.getUTCMonth() + 1
    return
}

setInterval(() => {
    const [pl_h, pl_m] = calculateTime("local")
    time_pl_h.textContent = pl_h
    time_pl_m.textContent = pl_m
    const [ir_h, is_m] = calculateTime(-1)
    time_ir_h.textContent = ir_h
    time_ir_m.textContent = is_m
    const [us_h, us_m] = calculateTime(-6)
    time_us_h.textContent = us_h
    time_us_m.textContent = us_m
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
    return [hours, minutes]
}
