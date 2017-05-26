document.body.setAttribute("ng-app", "berlinVeganMapApp");

var innerDiv = document.createElement('div');
innerDiv.setAttribute("ng-view", "");
var outerDiv = document.createElement('div');
outerDiv.setAttribute("class", "container-fluid");
outerDiv.appendChild(innerDiv);
document.body.appendChild(outerDiv);
