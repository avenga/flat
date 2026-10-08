function selectNavElement(uri) {
    const element = document.body.querySelector(`nav.main a[href = "${uri}"]`)

    for (const details of document.querySelectorAll("nav.main details")) {
        details.open = false
    }

    let parent = element?.parentElement
    while (parent) {
        if (parent.tagName === "DETAILS") {
            parent.open = true
        }
        parent = parent.parentElement
    }

    element?.classList.add("selected");
    element?.scrollIntoView({block: "center"});
}

// ----------------------------------------------------------------------

const input = document.getElementById("search")
const results = document.getElementById("search-results")

const rect = input.getBoundingClientRect()
results.style.top = `${rect.bottom}px`

input.addEventListener("input", () => {
    const query = input.value.trim()
    if (!query || query.length < 2) {
        results.replaceChildren()
        return
    }

    const hits = miniSearch.search(query)
    results.replaceChildren(...hits.slice(0, 15).map(hit => {
        const li = document.createElement("li")
        const a = document.createElement("a")

        // sessionStorage.setItem("query", JSON.stringify(query.split(/\s+/))) // FIXME multipe words
        a.href = baseURI + hit.uri
        a.textContent = hit.title
        li.append(a)
        return li
    }))
})

document.body.addEventListener("click", () => {
    if (input.contains(event.target) || results.contains(event.target)) {
        results.style.display = ""
    } else {
        results.style.display = "none"
    }
})

// document.addEventListener("DOMContentLoaded", () => {
//     const searchTerms = JSON.parse(sessionStorage.getItem("query"))
//     sessionStorage.removeItem("query")
// })
