//loop over each repo to get the amount of JS/CSS/HTML used in each repo and store it within the specific repo object on the student obj
const getRepoLangAmount = (arrayOfPromises, student) => {
    let allStudentObjs = []

    Promise.all(arrayOfPromises).then(responses => {
        responses.forEach(response => {
            console.log(response)
            // student.repositories[i].languages = response
        })
    })
}


let createPromises = studentObj => {
    let arrayOfPromises = []

    console.log("studentObj", studentObj)

    studentObj['repositories'].forEach(repo => {
        arrayOfPromises.push(
            $.ajax({
                url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/repos/${studentObj.githubHandle}/${repo.repoName}/languages`
            })
        )
    })

    getRepoLangAmount(arrayOfPromises, studentObj)
}