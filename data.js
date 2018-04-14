
const repoDB = {};
const userDB = {};


$.ajax({
    url: "c25.json", 
    success: function(result){
        getStudentRepos(result)
    }
});

const getStudentRepos = (students) => {
    let studentRepos = []

    students.forEach(student => {
        $.ajax({
            url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${student.githubHandle}/repos`, 
        }).then(res => {
            studentRepos.push(res)
            return studentRepos
        }).then(studentRepos => {
            studentRepos.forEach(studentsRepos => {
                getRepoLangAmount(studentRepos)
            })
        })
    });
}

let getRepoLangAmount = (repos) => {
    let allLang = []
    repos[0].forEach(repo => {
        $.ajax({
            url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages` 
        }).then(res => {
            allLang.push(res)
            return allLang
        }).then(allLang => {
            console.log(allLang)
        })
    })
}