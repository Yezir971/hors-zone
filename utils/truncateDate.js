const truncateDate = (date) => {
    const formatted = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    return formatted
}
module.exports = truncateDate
