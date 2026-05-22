use("CrudDb");

db.createCollection("courses");
db.courses.insert({
    name:"Harrys web dev",
    price: 0,
    assignment:12,
    projects:45
})