import resources from "./resources.json" assert { type: "json" }

const container = document.querySelector("#list-container")

const elements = {
    hours: document.querySelectorAll(".hours"),
    minutes: document.querySelectorAll(".minutes"),
}

setInterval(() => {
    const currentTime = calculateTime()
    elements.hours[0].innerText = padZero(currentTime[0])
    elements.hours[1].innerText = padZero(currentTime[0] - 6)
    elements.hours[2].innerText = padZero(currentTime[0] - 1)
    elements.minutes.forEach((element) => (element.innerText = padZero(currentTime[1])))
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

function calculateTime() {
    const currentTime = new Date()
    return [currentTime.getHours(), currentTime.getMinutes()]
}

function padZero(value) {
    if (value < 10) return `0${value}`
    return `${value}`
}
