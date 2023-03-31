'use strict'

const select = document.getElementById('cars')
const list = document.getElementById('list')

select.value = ''

const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1)
}

const getData = async (url) => {
    try {
        const responseCars = await fetch(url)
        return await responseCars.json()
    } catch (error) {
        throw new Error(error.message)
    }
}

const renderSelect = (data) => {
    if (!data.cars) return

    data.cars.forEach(car => {
        select.insertAdjacentHTML('beforeend',
            `<option value="${car.brand.toLowerCase()}">${capitalize(car.brand)}</option>`
        )
    })
}

const renderDescription = (car) => {
    list.innerHTML = ''

    list.insertAdjacentHTML('beforeend',
        `<li>Тачка: <span>${capitalize(car.brand)} ${car.model}</span></li>
         <li>Цена: <span>${car.price}$</span></li>`
    )
}

const renderCar = (data, e) => {
    if (!data.cars) return

    data.cars.forEach(car => {
        if (car.brand.toLowerCase() === e.target.value) {
            renderDescription(car)
        } else return
    })
}

select.addEventListener('change', (e) => getData('./db/cars.json').then(data => {
    renderCar(data, e)
}).catch(error => {
    alert(error.message)
}))

getData('./db/cars.json').then(data => {
    renderSelect(data)
}).catch(error => {
    alert(error.message)
})