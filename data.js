
const studentDatabase = {}

//get student data from local json file
$.ajax({
    url: "c25.json", 
    success: result => {
        getStudentRepos(result)
    }
});

//hit the github API to get all repos for each student
const getStudentRepos = (students) => {
    let studentRepos = []

    students.forEach(student => {
        $.ajax({
            url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${student.githubHandle}/repos`, 
        }).then(res => {
            studentRepos.push(res)
            return studentRepos
        }).then(studentRepos => {
            studentDataFactory(student, studentRepos)
        })
    });
}

//build a student object with the structure we agreed upon in planning
const studentDataFactory = (student, studentRepos) => {
    let studentData = Object.create(null, {
        name: {
            value: student.name
        },
        githubHandle: {
            value: student.githubHandle
        },
        img: {
            value: studentRepos[0][0].owner.avatar_url
        },
        cohort: {
            value: "25"
        },
        lastcommit: {
            value: null
        },
        repositories: {
            value: parseStudentRepos(studentRepos)
                
            }
        })

    getRepoLangAmount(studentData)
}

//grab specific data about the repos from the API results
const parseStudentRepos = (studentRepos) => {
    let parsedData = studentRepos[0].map(repo => {
        let obj = {
            repoName: repo.name,
            dateCreated: repo.created_at,
            languages: null
        }
        return obj
    })
    return parsedData
}


//loop over each repo to get the amount of JS/CSS/HTML used in each repo and store it within the specific repo object on the student obj
const getRepoLangAmount = (student) => {
    console.log("student", student)
    let repos = student['repositories']

    for(let i = 0; i < repos.length; i++){
        let languages = getRepoLanguages(repos[i], student)
        student.repositories[i].languages = languages
    }
    console.log(student)
}

async function getRepoLanguages(repo, student){
    const response = await fetch(`https://spyproxy.bangazon.com/student/commit/https://api.github.com/repos/${student.githubHandle}/${repo.repoName}/languages`)
    const data = await response.json()
    console.log("response ", data)
    return data
}