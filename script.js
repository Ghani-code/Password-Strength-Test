const parameter = document.getElementById("parameter")
const pass = document.getElementById("password")
const reason1 = document.getElementById("reason")
const result = document.getElementById("result")

pass.addEventListener('input', updateStrengthMeter)

function updateStrengthMeter() {
    const weaknesses = CalculatePassStrength(pass.value)

    let strength = 100
    reason1.innerHTML = ""
    weaknesses.forEach(weakness => {
        if (pass.value == "") {
            weakness.massage = ""
            result.innerText = ""
        }
        strength -= weakness.deduction
        console.log(strength);
        const massageElement = document.createElement("div")
        massageElement.innerText = weakness.massage
        reason1.appendChild(massageElement)
        if (strength < 40 && strength > 0 || strength < 0) {
            result.innerText = "your password is easy to crack"
            document.getElementById("result").style.color = "red"
            document.getElementById("parameterContain").style.backgroundColor = "red"

        } else if (strength >= 40 && strength < 70) {
            result.innerText = "you can make your password more safety"
            document.getElementById("result").style.color = "#eb8934"
            document.getElementById("parameterContain").style.backgroundColor = "#eb8934"

        } else if (strength >= 70 && strength < 90) {
            result.innerText = "your password is safe"
            document.getElementById("result").style.color = "yellow"
            document.getElementById("parameterContain").style.backgroundColor = "yellow"

        } else if (strength >= 90) {
            result.innerText = "your password is very safe"
            document.getElementById("result").style.color = "#43eb34"
            document.getElementById("parameterContain").style.backgroundColor = "#43eb34"

        }
        if (pass.value == "") {
            weakness.massage = ""
            result.innerText = ""
        }

    });

    parameter.style.setProperty('--strength', strength)
}

function CalculatePassStrength(password) {
    const weaknesses = []
    weaknesses.push(lengthWeaaknesses(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(upperCaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharacterWeakness(password))
    return weaknesses
}

function lengthWeaaknesses(password) {
    const length = password.length
    if (length <= 5 && length > 0) {
        return {
            massage: "- your password is too short\n",
            deduction: 30
        }
    }
    if (length == 0) {
        return {
            deduction: 100,
            massage: ""
        }
    } else if (length <= 10) {
        return {
            massage: "- your password could be longer\n",
            deduction: 15
        }
    } else {
        return {
            deduction: 0,
            massage: "",
        }
    }
}

function lowerCaseWeakness(password) {
    return characterTypeWeakness(password, /[a-z]/g, "lowercase character")
}

function upperCaseWeakness(password) {
    return characterTypeWeakness(password, /[A-Z]/g, "uppercase character")
}

function numberWeakness(password) {
    return characterTypeWeakness(password, /[0-9]/g, "numbers")
}

function specialCharacterWeakness(password) {
    return characterTypeWeakness(password, /[^0-9a-zA-Z]/g, "special character") // tanda ^ itu artinya selain dari.. (sama seperti tanda ! fungsinya)
}

function characterTypeWeakness(password, regex, type) {
    const matches = password.match(regex) || []
    if (matches.length == 0) {
        return {
            massage: `- your password has no ${type}\n`,
            deduction: 20
        }
    } else if (matches.length <= 2) {
        return {
            massage: `- your password could use more ${type}`,
            deduction: 5
        }
    } else {
        return {
            deduction: 0,
            massage: ""
        }
    }
}