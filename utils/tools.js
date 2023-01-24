export function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

export function checkIfAllTrue(list) {

    let value = true

    for (let item in list) {

        if (list[item] == false) {
            return false
        }


    }

    return true

}