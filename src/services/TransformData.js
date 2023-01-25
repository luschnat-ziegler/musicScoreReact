export function sortAbc(data) {
    const articles = ["der", "die", "das", "the"];
    data.forEach(function (item, index) {
        let splitTitle = item.Title.split(" ");
        if (
            splitTitle.length > 1 &&
            articles.includes(splitTitle[0].toLowerCase())
        ) {
            let article = ", " + splitTitle.shift().toLowerCase()
            this[index].Title = splitTitle.join(" ") + article
        }
    }, data);
    data.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase())
    return data
}
