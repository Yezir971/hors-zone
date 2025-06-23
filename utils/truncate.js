const truncate = (text, maxLength) => {
    if (text.length <= maxLength) return text

    const cut = text.slice(0, maxLength / 2)
    const lastSpace = cut.lastIndexOf(' ')

    // Si espace trouvé, on coupe proprement
    if (lastSpace > 0) {
        return cut.slice(0, lastSpace) + '…'
    }

    // Sinon on coupe brutalement (mot unique très long)
    return cut + '…'
}

module.exports = truncate
