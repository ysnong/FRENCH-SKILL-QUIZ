var finalScore = sessionStorage.getItem("finalScore");
const score = document.getElementById("score");
const grade = document.getElementById("grade");

score.innerText = `${finalScore}/6`;
var finalGrade = ((finalScore/6)*100).toFixed(2);
grade.innerText = `${finalGrade}%`;


