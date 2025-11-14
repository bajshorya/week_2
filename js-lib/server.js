const { pluck } = require("@shoryabaj/utils");
console.log(pluck([{ name: "foo" }, { name: "bar" }], "name"));
