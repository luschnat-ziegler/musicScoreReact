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
        this[index].ComposerString = item.Composers ? getComposers(item) : ""
        this[index].TagString = item.Tags ? getTags(item) : ""
    }, data);
    data.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase())
    return data
}

function getComposers(item) {
    return item.Composers.reduce(
        (accumulator, currentValue, index) => accumulator + (currentValue.FirstName === null ? "" : currentValue.FirstName) + " " + currentValue.LastName + (index === item.Composers.length - 1 ? "" : ", "),
        ""
    )
}

function getTags(item) {
    return item.Tags.reduce(
        (accumulator, currentValue, index) => accumulator + currentValue.Content + (index === item.Tags.length - 1 ? "" : ", "),
        ""
    )
}
