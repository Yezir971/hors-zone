const truncateDate = (date) => {
    const formatted = new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    return formatted
}

module.exports = truncateDate
