const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// List of questions objects containing the prompt and which type of employee it is for
const questionList = [
    {prompt: {type: "input", message: "What is the {{ position }}'s name?", name: "name"},
    for: "all"},
    {prompt: {type: "input", message: "What is the {{ position }}'s email address?", name: "email"},
    for: "all"},
    {prompt: {type: "input", message: "What is the manager's office number?", name: "officeNumber"},
    for: "manager"},
    {prompt: {type: "input", message: "What is the engineer's github username?", name: "github"},
    for: "engineer"},
    {prompt: {type: "input", message: "What is the intern's school name?", name: "school"},
    for: "intern"},
    {prompt: {type: "list", message: "Which type of team member would you like to add?", name: "type", 
    choices: [
        {name: "Engineer", value: "engineer"},
        {name: "Intern", value: "intern"},
        {name: "I don't want to add any more", value: "none"}
    ]},
    for: "all"}
];

// Function to get question prompts for a position
function getQuestionsFor(position) {
    // Filter the questions for all employees or the given position
    const questions = questionList.filter(function(question) {
        return (question.for === "all" || question.for === position);
    });
    // Replace the placeholder with the position and return the prompts
    const prompts = questions.map(function(question) {
        const temp = {...question.prompt}
        temp.message = temp.message.replace("{{ position }}", position);
        return temp;
    });

    return prompts;
}

// console.log(getQuestionsFor("intern"));