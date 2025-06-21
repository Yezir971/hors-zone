// objectif faire une fonction qui prend en entré un le retour de Date.now() -> 1750534640099 et retourne la différence entre la date actuelle et Date.now() ex 16h ou 1j ou 3j

const dateMessage = (date) => {
    const now = Date.now()
    const then = date.getTime()
    const diff = now - then - 7200000 // la différence moins les 2h UTC, je comprend pas d'où vient le décalage de 2h

    let secondes = Math.floor((diff / 1000) % 60)
    let minutes = Math.floor((diff / (1000 * 60)) % 60)
    let heures = Math.floor((diff / (1000 * 60 * 60)) % 24)
    let jours = Math.floor(diff / (1000 * 60 * 60 * 24))
    let annees = Math.floor(jours / 365)

    if (annees == 0) {
        if (jours != 0) {
            return `${jours}j`
        } else if (heures != 0) {
            return `${heures}h`
        } else if (minutes != 0) {
            return `${minutes}min`
        } else if (secondes != 0) {
            return `${secondes}s`
        } else {
            return '1s'
        }
    }
    return `${annees}ans`
}

module.exports = dateMessage
